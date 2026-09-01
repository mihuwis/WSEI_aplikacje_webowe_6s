import { useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import type { CreateProjectDto } from "../types/project.types";
import { ROUTES } from "../../../app/routes/routes.constants";

export function AddProjectPage(){

    const [formData, setFormData] = useState<CreateProjectDto>({
        name: "",
        description: "",
    });

    return(
        <div>
            <h1>Nowy Projekt</h1>
            <form>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-950">Nazwa projektu</label>
                    <div className="mt-2">
                    <input
                        type="text" id="title" value={formData.name} required
                        onChange={(e) => setFormData((currentData) => ({
                            ...currentData, name: e.target.value
                        }))}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    />
                    </div>
                </div>
            </form>
        </div>
    )
}