import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { userProfileService } from "../services/userProfile.service";
import type { UserProfile } from "../types/user.profile";
import type { UserRole } from "../types/user.types";

const USER_ROLES: UserRole[] = [
    "guest",
    "developer",
    "devops",
    "admin",
];

export function AdminUsersPage() {
    const { userProfile: currentUser } = useAuth();

    const [users, setUsers] = useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savingUid, setSavingUid] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setError(null);

                const loadedUsers =
                    await userProfileService.getAll();

                const sortedUsers = loadedUsers.sort((first, second) =>
                    first.displayName.localeCompare(second.displayName),
                );

                setUsers(sortedUsers);
            } catch (caughtError) {
                const message =
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Nie udało się pobrać użytkowników";

                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        void loadUsers();
    }, []);

    const handleRoleChange = async (
        uid: string,
        role: UserRole,
    ) => {
        try {
            setSavingUid(uid);
            setError(null);

            await userProfileService.updateRole(uid, role);

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.uid === uid
                        ? { ...user, role }
                        : user,
                ),
            );
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : "Nie udało się zmienić roli";

            setError(message);
        } finally {
            setSavingUid(null);
        }
    };

    const handleBlockedStatusChange = async (
        uid: string,
        isBlocked: boolean,
    ) => {
        try {
            setSavingUid(uid);
            setError(null);

            await userProfileService.updateBlockedStatus(
                uid,
                isBlocked,
            );

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.uid === uid
                        ? { ...user, isBlocked }
                        : user,
                ),
            );
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : "Nie udało się zmienić statusu konta";

            setError(message);
        } finally {
            setSavingUid(null);
        }
    };

    if (isLoading) {
        return <p>Ładowanie użytkowników...</p>;
    }

    return (
        <section>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-950">
                    Zarządzanie użytkownikami
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                    Nadawaj role oraz blokuj dostęp do aplikacji.
                </p>
            </div>

            {error && (
                <p
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </p>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">
                                    Użytkownik
                                </th>
                                <th className="px-4 py-3">
                                    Rola
                                </th>
                                <th className="px-4 py-3">
                                    Status
                                </th>
                                <th className="px-4 py-3">
                                    Akcja
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            {users.map((user) => {
                                const isCurrentUser =
                                    user.uid === currentUser?.uid;

                                const isSaving =
                                    savingUid === user.uid;

                                return (
                                    <tr key={user.uid}>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-slate-950">
                                                {user.displayName}
                                                {isCurrentUser && " (Ty)"}
                                            </p>

                                            <p className="text-slate-500">
                                                {user.email}
                                            </p>
                                        </td>

                                        <td className="px-4 py-4">
                                            <select
                                                value={user.role}
                                                disabled={
                                                    isSaving ||
                                                    isCurrentUser
                                                }
                                                onChange={(event) =>
                                                    void handleRoleChange(
                                                        user.uid,
                                                        event.target
                                                            .value as UserRole,
                                                    )
                                                }
                                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {USER_ROLES.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={
                                                    user.isBlocked
                                                        ? "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                                                        : "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                                                }
                                            >
                                                {user.isBlocked
                                                    ? "Zablokowany"
                                                    : "Aktywny"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                disabled={
                                                    isSaving ||
                                                    isCurrentUser
                                                }
                                                onClick={() =>
                                                    void handleBlockedStatusChange(
                                                        user.uid,
                                                        !user.isBlocked,
                                                    )
                                                }
                                                className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isSaving
                                                    ? "Zapisywanie..."
                                                    : user.isBlocked
                                                      ? "Odblokuj"
                                                      : "Zablokuj"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}