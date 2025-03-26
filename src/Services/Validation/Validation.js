

export const EMAIL_VALIDATION = {
    required: "Email is required",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email format",
    },
}; 