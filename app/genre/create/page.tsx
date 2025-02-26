'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/genre', { nama, deskripsi});
            router.push('/genre');
        } catch (error) {
            console.error('Error creating genre:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tambah Genre</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama" className="block text-gray-700 font-medium mb-1">Nama Genre</label>
                        <input
                            id="nama"
                            type="text"
                            value={nama}
                            onChange={e => setNama(e.target.value)}
                            placeholder="Nama Genre"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="deskripsi" className="block text-gray-700 font-medium mb-1">Deskripsi</label>
                        <input
                            id="deskripsi"
                            type="text"
                            value={deskripsi}
                            onChange={e => setDeskripsi(e.target.value)}
                            placeholder="Deskripsi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Tambah
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;