import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, activityLogs, invitations } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

/**
 * Script pour nettoyer tous les utilisateurs et équipes de test
 *
 * ATTENTION: Ce script supprime TOUTES les données de la base de données.
 * Utilisez avec précaution !
 */

async function cleanDatabase() {
  console.log('🧹 Début du nettoyage de la base de données...\n');

  try {
    // 1. Supprimer toutes les invitations
    console.log('📧 Suppression des invitations...');
    const deletedInvitations = await db.delete(invitations);
    console.log(`   ✓ ${deletedInvitations.rowCount || 0} invitations supprimées\n`);

    // 2. Supprimer tous les logs d'activité
    console.log('📝 Suppression des logs d\'activité...');
    const deletedLogs = await db.delete(activityLogs);
    console.log(`   ✓ ${deletedLogs.rowCount || 0} logs supprimés\n`);

    // 3. Supprimer tous les membres d'équipe
    console.log('👥 Suppression des membres d\'équipe...');
    const deletedMembers = await db.delete(teamMembers);
    console.log(`   ✓ ${deletedMembers.rowCount || 0} membres supprimés\n`);

    // 4. Supprimer toutes les équipes
    console.log('🏢 Suppression des équipes...');
    const deletedTeams = await db.delete(teams);
    console.log(`   ✓ ${deletedTeams.rowCount || 0} équipes supprimées\n`);

    // 5. Supprimer tous les utilisateurs
    console.log('👤 Suppression des utilisateurs...');
    const deletedUsers = await db.delete(users);
    console.log(`   ✓ ${deletedUsers.rowCount || 0} utilisateurs supprimés\n`);

    // 6. Réinitialiser les séquences d'auto-incrémentation
    console.log('🔄 Réinitialisation des séquences d\'ID...');
    await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE teams_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE team_members_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE activity_logs_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE invitations_id_seq RESTART WITH 1`);
    console.log('   ✓ Séquences réinitialisées\n');

    console.log('✅ Nettoyage terminé avec succès !');
    console.log('\n💡 Vous pouvez maintenant exécuter "pnpm db:seed" pour recréer les données de test.\n');

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Exécuter le script
cleanDatabase();
