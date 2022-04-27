import type { DefineHandlerOptions } from "@digitak/gravity/handler/DefineHandlerOptions";
import { normalizeHandlerOptions } from "@digitak/gravity/handler/normalizeHandlerOptions";
import { resolveApiRequest } from "@digitak/gravity/handler/resolveApiRequest";
import { apiMatchesUrl } from "@digitak/gravity/utilities/apiMatchesUrl";
import { parseHeaders } from "@digitak/gravity/utilities/parseHeaders";
import type { Handle } from "@sveltejs/kit";

export const defineHandler = <Context>(
	options: DefineHandlerOptions<Context, Request, Response>,
) => {
	const { apiPath } = normalizeHandlerOptions(options);

	return <Handle>(async ({ event, resolve }) => {
		const { url, request } = event;
		const { pathname } = url;
		if (!apiMatchesUrl(apiPath, pathname)) return resolve(event);
		const rawBody = new Uint8Array(await request.arrayBuffer());

		return await resolveApiRequest<Context, Request, Response>({
			request,
			method: request.method,
			url: pathname.slice(apiPath.length),
			rawBody,
			allowedOrigins: options.allowedOrigins,
			services: options.services,
			schema: options.schema,
			headers: parseHeaders(request.headers),
			authorize: options.authorize,
			onRequestReceive: options.onRequestReceive,
			onResponseSend: options.onResponseSend,
			createResponse: ({ body, headers, status }) =>
				new Response(body, {
					headers,
					status,
				}),
		});
	});
};
