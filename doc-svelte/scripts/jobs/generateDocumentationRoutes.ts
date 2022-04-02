import fs from 'fs-extra';
import path from 'path';
import { removeFileNameIndex } from '../../src/utilities/removeFileNameIndex';
import { formatRouteName } from '../../src/utilities/formatRouteName';

const documentationAlias = (source: string) =>
	`
<script lang="ts">
	import Page from "${source}";
</script>


<Page />
`.trim();

export function generateDocumentationRoutes(
	source = 'src/documentation',
	target = 'src/routes/documentation'
) {
	fs.ensureDirSync(target);

	for (let fileName of fs.readdirSync(source)) {
		const filePath = path.join(source, fileName);
		fileName = removeFileNameIndex(fileName);
		let targetPath = path.join(target, formatRouteName(fileName));

		if (fs.statSync(filePath).isDirectory()) {
			generateDocumentationRoutes(filePath, targetPath);
		} else {
			if (targetPath.endsWith('.md')) {
				targetPath = targetPath.slice(0, -3) + '.svelte';
			}

			if (fileName == '__layout.svelte') {
				fs.copyFileSync(filePath, targetPath);
			} else {
				fs.writeFileSync(targetPath, documentationAlias(path.relative(target, filePath)));
			}
		}
	}
}
