const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'ai-agent.db');
const db = new Database(dbPath);

console.log('Starting database migration...');

try {
  // Check if upvotes column exists
  const tableInfo = db.pragma('table_info(items)');
  const hasUpvotes = tableInfo.some(col => col.name === 'upvotes');
  
  if (!hasUpvotes) {
    console.log('Adding upvotes and downvotes columns...');
    db.exec(`
      ALTER TABLE items ADD COLUMN upvotes INTEGER DEFAULT 0;
      ALTER TABLE items ADD COLUMN downvotes INTEGER DEFAULT 0;
    `);
    console.log('✅ Successfully added voting columns');
  } else {
    console.log('✅ Voting columns already exist');
  }
  
  // Verify the columns exist
  const updatedTableInfo = db.pragma('table_info(items)');
  console.log('\nCurrent table schema:');
  updatedTableInfo.forEach(col => {
    console.log(`  - ${col.name}: ${col.type}`);
  });
  
  console.log('\n✅ Migration completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exit(1);
} finally {
  db.close();
}
