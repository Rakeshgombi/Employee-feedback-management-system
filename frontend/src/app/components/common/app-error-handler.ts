import { ErrorHandler } from "@angular/core";
import { AppError } from "./app-error";

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    alert("An unexpected error occurred.");
    console.log(error);
  }
}