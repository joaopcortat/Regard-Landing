import { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Stethoscope, Building } from 'lucide-react';

import { type Appointment } from './AppointmentSlot';

interface NewAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (appointment: Omit<Appointment, 'id' | 'status' | 'paymentStatus' | 'duration' | 'type'>) => void;
}

export function NewAppointmentModal({ isOpen, onClose, onSave }: NewAppointmentModalProps) {
    if (!isOpen) return null;

    const [form, setForm] = useState({
        patient: '',
        procedure: 'Consultation',
        professional: 'Dr. Ana Silva',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        room: 'Sala 1'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            patient: form.patient,
            procedure: form.procedure,
            time: form.time,
            // Mocking other fields for the new item
            hasNotes: false,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl border border-[#27272a] bg-[#121214] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-white">Novo Agendamento</h2>
                    <button onClick={onClose} className="rounded-lg p-1 text-[#a1a1aa] hover:bg-[#27272a] hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#a1a1aa]">Paciente</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                            <input
                                type="text"
                                required
                                placeholder="Buscar paciente..."
                                className="w-full rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white placeholder:text-[#52525b] focus:border-[#3b82f6] focus:outline-none"
                                value={form.patient}
                                onChange={e => setForm({ ...form, patient: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Procedure */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#a1a1aa]">Procedimento</label>
                            <div className="relative">
                                <Stethoscope className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                <select
                                    className="w-full appearance-none rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white focus:border-[#3b82f6] focus:outline-none"
                                    value={form.procedure}
                                    onChange={e => setForm({ ...form, procedure: e.target.value })}
                                >
                                    <option value="Consulta">Consulta</option>
                                    <option value="Botox">Botox</option>
                                    <option value="Preenchimento">Preenchimento</option>
                                    <option value="Laser">Laser</option>
                                </select>
                            </div>
                        </div>

                        {/* Professional */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#a1a1aa]">Profissional</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                <select
                                    className="w-full appearance-none rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white focus:border-[#3b82f6] focus:outline-none"
                                    value={form.professional}
                                    onChange={e => setForm({ ...form, professional: e.target.value })}
                                >
                                    <option>Dr. Ana Silva</option>
                                    <option>Dr. Pedro Santos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#a1a1aa]">Data</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                <input
                                    type="date"
                                    className="w-full rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white focus:border-[#3b82f6] focus:outline-none [color-scheme:dark]"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#a1a1aa]">Horário</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                <input
                                    type="time"
                                    className="w-full rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white focus:border-[#3b82f6] focus:outline-none [color-scheme:dark]"
                                    value={form.time}
                                    onChange={e => setForm({ ...form, time: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Room */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#a1a1aa]">Sala / Ativo</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                            <select
                                className="w-full appearance-none rounded-lg border border-[#27272a] bg-[#18181b] py-2 pl-9 pr-3 text-sm text-white focus:border-[#3b82f6] focus:outline-none"
                                value={form.room}
                                onChange={e => setForm({ ...form, room: e.target.value })}
                            >
                                <option>Sala 1 (Laser)</option>
                                <option>Sala 2 (Injetáveis)</option>
                                <option>Consultório 1</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-[#a1a1aa] hover:bg-[#27272a] hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb] transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Agendar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
