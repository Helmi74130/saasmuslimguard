import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  KeyRound,
  Puzzle,
  Link2,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/queries';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: UserPlus,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinus,
  [ActivityType.INVITE_TEAM_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle,
  [ActivityType.REQUEST_PASSWORD_RESET]: KeyRound,
  [ActivityType.RESET_PASSWORD]: KeyRound,
  [ActivityType.EXTENSION_REGISTERED]: Puzzle,
  [ActivityType.EXTENSION_LINKED]: Link2,
  [ActivityType.EXTENSION_REVOKED]: XCircle,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return 'Vous vous êtes inscrit';
    case ActivityType.SIGN_IN:
      return 'Vous vous êtes connecté';
    case ActivityType.SIGN_OUT:
      return 'Vous vous êtes déconnecté';
    case ActivityType.UPDATE_PASSWORD:
      return 'Vous avez changé votre mot de passe';
    case ActivityType.DELETE_ACCOUNT:
      return 'Vous avez supprimé votre compte';
    case ActivityType.UPDATE_ACCOUNT:
      return 'Vous avez mis à jour votre compte';
    case ActivityType.CREATE_TEAM:
      return 'Vous avez créé une nouvelle famille';
    case ActivityType.REMOVE_TEAM_MEMBER:
      return 'Vous avez retiré un membre de la famille';
    case ActivityType.INVITE_TEAM_MEMBER:
      return 'Vous avez invité un membre';
    case ActivityType.ACCEPT_INVITATION:
      return 'Vous avez accepté une invitation';
    case ActivityType.REQUEST_PASSWORD_RESET:
      return 'Vous avez demandé une réinitialisation de mot de passe';
    case ActivityType.RESET_PASSWORD:
      return 'Vous avez réinitialisé votre mot de passe';
    case ActivityType.EXTENSION_REGISTERED:
      return 'Une extension a été enregistrée';
    case ActivityType.EXTENSION_LINKED:
      return 'Une extension a été liée à votre compte';
    case ActivityType.EXTENSION_REVOKED:
      return 'Une extension a été révoquée';
    default:
      return 'Action inconnue';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Journal d'activité
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const formattedAction = formatAction(
                  log.action as ActivityType
                );

                return (
                  <li key={log.id} className="flex items-center space-x-4">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {formattedAction}
                        {log.ipAddress && ` from IP ${log.ipAddress}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(new Date(log.timestamp))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune activité pour le moment
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Lorsque vous effectuez des actions telles que la connexion ou la mise à jour de votre
                compte, elles apparaissent ici.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
