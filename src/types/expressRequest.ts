import express, { Request, Response } from 'express';

declare module 'express' {
    export interface Request {
        isAuthenticated: any;
        logout: any;
        user: any;
    }
}
export default express;
