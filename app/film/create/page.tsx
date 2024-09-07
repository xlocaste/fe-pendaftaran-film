'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
    const [judul, setJudul] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [tanggal_publish, setTanggalPublish] = useState('');
    const [sutradara, setSutradara] = useState('');
    const [studio, setStudio] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/film', { judul, sinopsis, tanggal_publish, sutradara, studio});
            router.push('/film');
        } catch (error) {
            console.error('Error creating film:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tambah Film</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="judul" className="block text-gray-700 font-medium mb-1">Judul Film</label>
                        <input
                            id="judul"
                            type="text"
                            value={judul}
                            onChange={e => setJudul(e.target.value)}
                            placeholder="Judul Film"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sinopsis" className="block text-gray-700 font-medium mb-1">Sinopsis</label>
                        <input
                            id="sinopsis"
                            type="text"
                            value={sinopsis}
                            onChange={e => setSinopsis(e.target.value)}
                            placeholder="Sinopsis"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tanggal_publish" className="block text-gray-700 font-medium mb-1">Tanggal Publish</label>
                        <input
                            id="tanggal_publish"
                            type="date"
                            value={tanggal_publish}
                            onChange={e => setTanggalPublish(e.target.value)}
                            placeholder="Tanggal Publish"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sutradara" className="block text-gray-700 font-medium mb-1">Sutradara</label>
                        <input
                            id="sutradara"
                            type="text"
                            value={sutradara}
                            onChange={e => setSutradara(e.target.value)}
                            placeholder="Sutradara"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="studio" className="block text-gray-700 font-medium mb-1">Studio</label>
                        <input
                            id="studio"
                            type="text"
                            value={studio}
                            onChange={e => setStudio(e.target.value)}
                            placeholder="Studio"
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