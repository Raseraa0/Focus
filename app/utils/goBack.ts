import { Router } from "expo-router";


export const goBack = (router: Router) => {
    if (router.canGoBack()) {
        router.back()
    }
}