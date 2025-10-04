

import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { ACUnit, GeminiFunctionCall, GeminiResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const functionDeclarations: FunctionDeclaration[] = [
    {
        name: 'setAcPower',
        parameters: {
            type: Type.OBJECT,
            description: 'Turn an AC unit on or off.',
            properties: {
                acUnitName: {
                    type: Type.STRING,
                    description: 'The name of the AC unit to control, e.g., "Living Room".',
                },
                power: {
                    type: Type.BOOLEAN,
                    description: 'Set to true to turn on, false to turn off.',
                },
            },
            required: ['acUnitName', 'power'],
        },
    },
    {
        name: 'setAcTemperature',
        parameters: {
            type: Type.OBJECT,
            description: 'Set the temperature for an AC unit.',
            properties: {
                acUnitName: {
                    type: Type.STRING,
                    description: 'The name of the AC unit to control.',
                },
                temperature: {
                    type: Type.INTEGER,
                    description: 'The target temperature in Celsius (between 16 and 30).',
                },
            },
            required: ['acUnitName', 'temperature'],
        },
    },
    {
        name: 'setAcMode',
        parameters: {
            type: Type.OBJECT,
            description: 'Set the operating mode for an AC unit.',
            properties: {
                acUnitName: {
                    type: Type.STRING,
                    description: 'The name of the AC unit to control.',
                },
                mode: {
                    type: Type.STRING,
                    description: 'The mode to set. Must be one of: "cool", "heat", "fan", "auto".',
                },
            },
            required: ['acUnitName', 'mode'],
        },
    },
    {
        name: 'setAcFanSpeed',
        parameters: {
            type: Type.OBJECT,
            description: 'Set the fan speed for an AC unit.',
            properties: {
                acUnitName: {
                    type: Type.STRING,
                    description: 'The name of the AC unit to control.',
                },
                fanSpeed: {
                    type: Type.STRING,
                    description: 'The fan speed to set. Must be one of: "low", "medium", "high", "auto".',
                },
            },
            required: ['acUnitName', 'fanSpeed'],
        },
    },
    {
        name: 'getEnergyUsage',
        parameters: {
            type: Type.OBJECT,
            description: 'Get the energy usage for a specific AC unit.',
            properties: {
                acUnitName: {
                    type: Type.STRING,
                    description: 'The name of the AC unit to get information about.',
                },
            },
            required: ['acUnitName'],
        },
    }
];

export const getAiCommandResponse = async (prompt: string, acUnits: ACUnit[]): Promise<GeminiResponse> => {
    const systemInstruction = `
        You are an AI assistant for a smart home AC control system.
        The user will give you commands to control the air conditioners or ask about their status.
        Use the provided functions to execute the user's commands.
        When a user gives a vague command like "make it warmer", assume they mean to increase the temperature by 2 degrees. For "make it cooler", decrease by 2 degrees.
        If a user command doesn't specify an AC unit, and there is more than one unit, you MUST ask for clarification. For example, if they say "turn on the AC", respond with the text "Which AC unit would you like to turn on?". Do NOT call a function in this case.
        If the user's command is not a control command (e.g., "hello", "how are you"), respond with a friendly greeting. Do not attempt to call a function.

        Here is the current state of all AC units:
        ${JSON.stringify(acUnits, null, 2)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                tools: [{ functionDeclarations: functionDeclarations }],
            },
        });
        
        // FIX: The `FunctionCall` type from the Gemini API has optional `name` and `args`,
        // while our internal `GeminiFunctionCall` expects them to be present.
        // We filter out any malformed function calls and map to our internal type.
        const functionCalls: GeminiFunctionCall[] | null = response.functionCalls
            ?.filter(fc => fc.name && fc.args)
            .map(fc => ({
                name: fc.name!,
                args: fc.args! as GeminiFunctionCall['args'],
            })) ?? null;

        return {
            text: response.text,
            functionCalls: functionCalls,
        };
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return {
            text: "I'm sorry, I encountered an error while processing your request.",
            functionCalls: null,
        };
    }
};
