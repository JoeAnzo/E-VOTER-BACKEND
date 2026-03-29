import bcrypt from 'bcryptjs'

export async function hashPassword(password){
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        return hashedPassword
    } catch (error) {
        throw error
    }
}

export async function checkPassword(password,storedPassword){
    try {
        const passwordCheck = await bcrypt.compare(password,storedPassword)
        return passwordCheck
    } catch (error) {
        throw error
    }
}