import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PatientList } from "@/components/patients/PatientList";
import { PatientProfile } from "@/components/patients/PatientProfile";

export function Patients() {
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>('1');

    return (
        <Layout>
            {/* 
                For the Patients page, we want a tighter full-screen split layout.
                We negate the Layout's default padding to create an edge-to-edge feel inside the container.
            */}
            <div className="flex h-[calc(100vh-8rem)] -m-8 overflow-hidden rounded-tl-xl border-t border-l border-[#27272a] shadow-inner bg-[#09090b]">
                <PatientList
                    onSelect={setSelectedPatientId}
                    selectedId={selectedPatientId}
                />

                {selectedPatientId ? (
                    <PatientProfile patientId={selectedPatientId} />
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-[#09090b] text-[#52525b]">
                        Selecione um paciente para ver o prontuário
                    </div>
                )}
            </div>
        </Layout>
    );
}
