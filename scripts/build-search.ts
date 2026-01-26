import { buildSearchIndex } from '../lib/search/build-index';

async function main() {
  console.log('🔍 Building search index...');

  try {
    const items = await buildSearchIndex();
    console.log(`✅ Search index built successfully! Indexed ${items.length} items.`);
  } catch (error) {
    console.error('❌ Error building search index:', error);
    process.exit(1);
  }
}

main();
