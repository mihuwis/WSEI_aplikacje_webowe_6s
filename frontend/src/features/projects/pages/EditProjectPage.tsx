import { useEffect, useState, type SubmitEvent } from "react";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../app/routes/routes.constants";
import { projectService } from "../services/project.service";
import type { CreateProjectDto } from "../types/project.types";

export function EditProjectPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateProjectDto>({
        name: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadErrorMessage, setLoadErrorMessage] =
        useState<string | null>(null);
    const [submitErrorMessage, setSubmitErrorMessage] =
        useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setLoadErrorMessage("Brak identyfikatora projektu.");
            setIsLoading(false);
            return;
        }

        let ignoreResult = false;

        const loadProject = async () => {
            try {
                const loadedProject =
                    await projectService.getById(projectId);

                if (ignoreResult) {
                    return;
                }

                if (!loadedProject) {
                    setLoadErrorMessage("Nie znaleziono projektu.");
                    return;
                }

                setFormData({
                    name: loadedProject.name,
                    description: loadedProject.description,
                });
            } catch (error: unknown) {
                if (!ignoreResult) {
                    console.error(error);
                    setLoadErrorMessage(
                        "Nie udało się pobrać projektu.",
                    );
                }
            } finally {
                if (!ignoreResult) {
                    setIsLoading(false);
                }
            }
        };

        void loadProject();

        return () => {
            ignoreResult = true;
        };
    }, [projectId]);

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        if (!projectId) {
            setSubmitErrorMessage("Brak identyfikatora projektu.");
            return;
        }

        const normalizedData: CreateProjectDto = {
            name: formData.name.trim(),
            description: formData.description.trim(),
        };

        if (
            normalizedData.name.length < 3 ||
            normalizedData.description.length < 10
        ) {
            setSubmitErrorMessage(
                "Nazwa musi mieć minimum 3 znaki, a opis minimum 10 znaków.",
            );
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitErrorMessage(null);

            const updatedProject = await projectService.update(
                projectId,
                normalizedData,
            );

            if (!updatedProject) {
                setSubmitErrorMessage("Nie znaleziono projektu.");
                return;
            }

            navigate(
                generatePath(ROUTES.projectDetails, {
                    projectId: updatedProject.id,
                }),
                { replace: true },
            );
        } catch (error: unknown) {
            console.error(error);
            setSubmitErrorMessage(
                "Nie udało się zapisać zmian projektu.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <p>Ładowanie projektu...</p>;
    }

    if (loadErrorMessage) {
        return <p role="alert">{loadErrorMessage}</p>;
    }

    if (!projectId) {
        return <p role="alert">Brak identyfikatora projektu.</p>;
    }

    const projectDetailsPath = generatePath(
        ROUTES.projectDetails,
        { projectId },
    );

    return (
        <section className="mx-auto max-w-2xl">
            <Link
                to={projectDetailsPath}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
                &larr; Wróć do szczegółów
            </Link>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        Projekty
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                        Edytuj projekt
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Zmień nazwę albo opis projektu.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-800"
                        >
                            Nazwa projektu
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            minLength={3}
                            autoFocus
                            value={formData.name}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    name: event.target.value,
                                }))
                            }
                            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-slate-800"
                        >
                            Opis projektu
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            required
                            minLength={10}
                            value={formData.description}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    description: event.target.value,
                                }))
                            }
                            className="mt-2 block w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {submitErrorMessage && (
                        <p
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                        >
                            {submitErrorMessage}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
                        <Link
                            to={projectDetailsPath}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
                        >
                            Anuluj
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Zapisywanie..."
                                : "Zapisz zmiany"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
