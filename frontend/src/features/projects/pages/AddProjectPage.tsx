import { useState, type SubmitEvent } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { projectService } from "../services/project.service";
import type { CreateProjectDto } from "../types/project.types";
import { ROUTES } from "../../../app/routes/routes.constants";

export function AddProjectPage() {

    const [formData, setFormData] = useState<CreateProjectDto>({
        name: "",
        description: "",
    });

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        const normalizedData: CreateProjectDto = {
            name: formData.name.trim(),
            description: formData.description.trim(),
        };
        
        if (
            normalizedData.name.length < 3 ||
            normalizedData.description.length < 10
        ) {
            setErrorMessage(
                "Nazwa minimum 3 znaki, a opis 10 znaków.",
            );
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage(null);

            const createdProject =
                await projectService.create(normalizedData);
            navigate(
                generatePath(ROUTES.projectDetails, {
                    projectId: createdProject.id,
                }),
                { replace: true },
            );
        } catch (error: unknown) {
            console.error(error);
            setErrorMessage("Nie udało się utworzyć projektu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mx-auto max-w-2xl">
            <Link
                to={ROUTES.projects}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
                &larr; Wróć do projektów
            </Link>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        Projekty
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                        Nowy projekt
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Podaj nazwę i krótki opis projektu.
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
                            name="name" type="text" required
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
                            name="description" rows={5}
                            required minLength={10}
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

                    {errorMessage && (
                        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
                        <Link
                            to={ROUTES.projects}
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
                                : "Utwórz projekt"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
