import type { IncomingMessage, ServerResponse } from "http";
import type { DefineHandlerOptions } from "./handler/DefineHandlerOptions.js";
import { extractRawBody } from "./utilities/extractRawBody.js";
import { resolveApiRequest } from "./handler/resolveApiRequest.js";
import { apiMatchesUrl } from "./utilities/apiMatchesUrl.js";
import { normalizeHandlerOptions } from "./handler/normalizeHandlerOptions.js";

export const defineHandler = <Context>(
	options: DefineHandlerOptions<Context, IncomingMessage, ServerResponse>,
) => {
	const { apiPath } = normalizeHandlerOptions(options);

	return async (
		request: IncomingMessage,
		response: ServerResponse,
		next?: Function,
	) => {
		const url = request.url ?? "";
		if (!apiMatchesUrl(apiPath, url)) return next?.();
		const rawBody = await extractRawBody(request);

		await resolveApiRequest<Context, IncomingMessage, ServerResponse>({
			request,
			url: url.slice(apiPath.length),
			rawBody,
			allowedOrigins: options.allowedOrigins,
			services: options.services,
			schema: options.schema,
			headers: request.headers,
			authorize: options.authorize,
			onRequestReceive: options.onRequestReceive,
			onResponseSend: options.onResponseSend,
			createResponse: ({ body, headers, status }) => {
				response.statusCode = status;
				for (const header in headers) {
					response.setHeader(header, headers[header]);
				}
				response.write(body);
				return response;
			},
		});

		return response.end();
	};
};
