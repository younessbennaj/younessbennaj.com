import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import { VFile } from 'vfile'
import fs from 'fs'
import path from 'path'

function extractHeadingsPlugin() {
  return (tree, file) => {
    const headings = []

    function visit(node) {
      if (
        node.type === 'element' &&
        ['h2', 'h3'].includes(node.tagName) &&
        node.properties &&
        node.properties.id
      ) {
        // Extraire le texte du heading
        const text = extractTextFromElement(node)

        if (text) {
          headings.push({
            level: parseInt(node.tagName.substring(1)),
            text: text.trim(),
            id: node.properties.id, // ID généré par rehype-slug
          })
        }
      }

      if (node.children) {
        node.children.forEach(visit)
      }
    }

    visit(tree)
    file.data.headings = headings

    // Important : retourner l'arbre original pour éviter l'erreur
    return tree
  }
}

// Fonction pour extraire le texte d'un élément HTML
function extractTextFromElement(node) {
  if (node.type === 'text') {
    return node.value
  }

  if (node.children) {
    return node.children.map(extractTextFromElement).join('')
  }

  return ''
}

export async function extractHeadingsFromMDX(articleSlug) {
  const filePath = path.join(
    process.cwd(),
    'src/app/articles',
    articleSlug,
    'content/pc.mdx',
  )

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Créer un fichier virtuel
    const file = new VFile({ value: fileContent, path: filePath })

    const processor = remark()
      .use(remarkMdx)
      .use(remarkRehype, { allowDangerousHtml: true }) // Convertir en AST HTML
      .use(rehypeSlug) // Générer les IDs avec rehype-slug
      .use(extractHeadingsPlugin) // Extraire les headings

    // Traiter le fichier
    processor.runSync(processor.parse(file), file)

    // Récupérer les headings depuis le fichier virtuel
    return file.data.headings || []
  } catch (error) {
    console.error('Error extracting headings:', error)
    return []
  }
}
