import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface LeadData {
    name: string;
    email: string;
    whatsapp: string;
    // Flexible metadata for quiz answers, UTM parameters, etc.
    quizData?: Record<string, any>;
}

interface UseWaitlistReturn {
    submitLead: (data: LeadData) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
}

export function useWaitlist(): UseWaitlistReturn {
    const [isLoading, setIsLoading] = useState(false);

    const submitLead = async ({ name, email, whatsapp, quizData }: LeadData) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.from('leads').insert({
                name,
                email,
                whatsapp, // Optional in DB but good to pass if we have it
                status: 'pending',
                // Spread quizData directly into the metadata JSONB column
                metadata: quizData || {}
            });

            if (error) {
                // Postgres Unique Violation Code
                if (error.code === '23505') {
                    return { success: false, error: "Você já está na lista de espera." };
                }
                throw error;
            }

            return { success: true };
        } catch (err: any) {
            console.error('Waitlist Error:', err);
            return {
                success: false,
                error: err.message || "Erro desconhecido ao entrar na lista."
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { submitLead, isLoading };
}
