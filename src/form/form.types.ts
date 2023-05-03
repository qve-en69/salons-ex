export interface IForm {
    serverErrors: { [key: string]: string[] };

    getFormData(): RequestType;

    setErrors(propertyPath: string, title: string): void;

    getErrors(property: string): string[];

    clearErrors(property: string): void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestType = {};

export type ResponseDataType = {
    status: boolean;
    response: string;
    additional?: any;
}
