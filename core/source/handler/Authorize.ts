import { BaseServiceConstructor } from "source/services/BaseServiceConstructor";

export type AuthorizeOptions<Context> = {
	context: Context;
	service: BaseServiceConstructor;
	path: string[];
};

export type Authorize<Context> = (
	options: AuthorizeOptions<Context>,
) => unknown;