import { SetsType } from "./dataType";
import { openDatabase } from "./db";


export const addSession = async ({ name, note, exercises }: { name: string, note: string, exercises: { exerciseId: number, sets: SetsType[] }[] }) => {
    const db = await openDatabase(); // Remplace par ta méthode d'accès à la DB


    await db.withTransactionAsync(async () => {
        // 1. Créer la session (Header)
        const sessionResult = await db.runAsync(
            `INSERT INTO presetsession (name, note, isActive) VALUES (?, ?, 1);`,
            [name, note]
        );

        const sessionId = sessionResult.lastInsertRowId;

        // 2. Parcourir les exercices pour créer les liens
        for (let i = 0; i < exercises.length; i++) {
            const exo = exercises[i];

            const exoLinkResult = await db.runAsync(
                `INSERT INTO presetsessionexercise (preset_id, exercise_id, position) VALUES (?, ?, ?);`,
                [sessionId, exo.exerciseId, i + 1] // i + 1 pour la position
            );

            const exoLinkId = exoLinkResult.lastInsertRowId;

            // 3. Créer les séries (Sets) pour cet exercice précis
            for (let j = 0; j < exo.sets.length; j++) {
                const set = exo.sets[j];

                await db.runAsync(
                    `INSERT INTO sets (preset_exo_id, position, reps) VALUES (?, ?, ?);`,
                    [exoLinkId, j + 1, set.reps]
                );
            }
        }
    });
};


// database/sessionService.ts

export const getSessions = async () => {
    const db = await openDatabase();

    // On récupère tout à plat via des jointures
    const result = await db.getAllAsync(`
    SELECT 
      s.id as sessionId, s.name as sessionName, s.note, s.isActive,
      pse.id as pseId, pse.position as exoPosition,
      e.id as exerciseId, e.name as exerciseName,
      sets.id as setId, sets.reps, sets.position as setPosition
    FROM presetsession s
    LEFT JOIN presetsessionexercise pse ON s.id = pse.preset_id
    LEFT JOIN exercises e ON pse.exercise_id = e.id
    LEFT JOIN sets ON pse.id = sets.preset_exo_id
    WHERE s.isActive = 1
    ORDER BY s.id DESC, pse.position ASC, sets.position ASC
  `);

    // On restructure les données pour avoir un tableau d'objets propres
    const sessionsMap = new Map();

    result.forEach((row: any) => {
        if (!sessionsMap.has(row.sessionId)) {
            sessionsMap.set(row.sessionId, {
                id: row.sessionId,
                name: row.sessionName,
                note: row.note,
                exercises: []
            });
        }

        const session = sessionsMap.get(row.sessionId);

        // Si on a un exercice sur cette ligne
        if (row.pseId) {
            let exercise = session.exercises.find((ex: any) => ex.pseId === row.pseId);
            if (!exercise) {
                exercise = {
                    pseId: row.pseId,
                    id: row.exerciseId,
                    name: row.exerciseName,
                    sets: []
                };
                session.exercises.push(exercise);
            }

            // Si on a une série sur cette ligne
            if (row.setId) {
                exercise.sets.push({
                    id: row.setId,
                    reps: row.reps,
                    position: row.setPosition
                });
            }
        }
    });

    return Array.from(sessionsMap.values());
};

export const deleteSession = async (id: number) => {
    const db = await openDatabase();
    // On fait un soft delete comme prévu
    await db.runAsync(`UPDATE presetsession SET isActive = 0 WHERE id = ?`, [id]);
};

export const updateSession = async (sessionId: number, { name, note, exercises }: { name: string, note: string, exercises: { exerciseId: number, sets: SetsType[] }[] }) => {
    const db = await openDatabase();

    await db.withTransactionAsync(async () => {
        // 1. Mettre à jour le header de la session
        await db.runAsync(
            `UPDATE presetsession SET name = ?, note = ? WHERE id = ?;`,
            [name, note, sessionId]
        );

        // 2. Supprimer les anciennes séries et les anciens liens d'exercices
        // Grâce au ON DELETE CASCADE dans ton SQL, supprimer dans 'presetsessionexercise'
        // devrait supprimer automatiquement les 'sets' liés.
        await db.runAsync(`DELETE FROM presetsessionexercise WHERE preset_id = ?;`, [sessionId]);

        // 3. Recréer les nouveaux liens et les nouvelles séries
        for (let i = 0; i < exercises.length; i++) {
            const exo = exercises[i];
            const exoLinkResult = await db.runAsync(
                `INSERT INTO presetsessionexercise (preset_id, exercise_id, position) VALUES (?, ?, ?);`,
                [sessionId, exo.exerciseId, i + 1]
            );

            const exoLinkId = exoLinkResult.lastInsertRowId;

            const setToInsert = exo.sets || []

            for (let j = 0; j < setToInsert.length; j++) {
                const set = setToInsert[j];
                await db.runAsync(
                    `INSERT INTO sets (preset_exo_id, position, reps) VALUES (?, ?, ?);`,
                    [exoLinkId, j + 1, set.reps]
                );
            }
        }
    });
};