export interface User {
    firstName: string;
    email: string;
    phone: number;
    username: string;
    clientId?: string;
    scope?: string;
    redirectUri?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    userId?: string;
    type?: string;
    isNewPasswordNeeded?: boolean;
    createdDate?: string;
    lastLoginDate?: string;
    updatedDate?: string;
    lastName?: string;
    isBlocked?: boolean;
}

export interface ModalData {
    header: string;
    passwordValidationRequired?: boolean;
    block: boolean;
    user: User;

}

export interface UserSuccessResponse {
    success: string;
    user: User;
}
