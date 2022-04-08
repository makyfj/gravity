import { BaseService } from "../services/BaseService";
import { gravityError, GravityError } from "../errors/GravityError";

const privateIndicators = ["_", "$"];

export function resolvePath(
	serviceName: string,
	service: BaseService<unknown>,
	path: string[],
): unknown {
	let resolved: any = service;

	for (const name of path) {
		if (
			resolved &&
			typeof resolved == "object" &&
			!privateIndicators.includes(name[0])
		) {
			resolved = resolved[name];
		} else {
			throw gravityError({
				message: "Target inexistant",
				serviceName,
				target: path.join("/"),
				status: 400,
			});
		}
	}

	return resolved;
}