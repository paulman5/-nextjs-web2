"use client"

import { handleAuth } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
// api/auth/[auth0]/route.tsx for dynamic routing

export const GET = handleAuth();

// Example function to check user existence
async function checkUserExists(email: string) {
    const response = await fetch(`/api/checkUser?email=${email}`);
    if (response.ok) {
        const data = await response.json();
        return data.exists;
    }
    throw new Error('Error checking user existence');
}

// Function to handle onboarding redirection
async function handleOnboarding(email: string) {
    const router = useRouter();

    try {
        const userExists = await checkUserExists(email);
        if (userExists) {
            router.push('/dashboard'); // Redirect to existing user flow
        } else {
            router.push('/onboarding'); // Redirect to onboarding flow
        }
    } catch (error) {
        console.error(error); // Handle error fetching user existence
        // Redirect to an error page or display an error message to the user
    }
}