'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [judul, setJudul] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [tanggal_publish, setTanggalPublish] = useState('');
    const [sutradara, setSutradara] = useState('');
    const [studio, setStudio] = useState('');
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/film/${id}`)
                .then(response => {
                    const kategori = response.data.data;
                    setJudul(kategori.judul);
                    setSinopsis(kategori.sinopsis);
                    setTanggalPublish(kategori.tanggal_publish);
                    setSutradara(kategori.sutradara);
                    setStudio(kategori.studio);
                })
                .catch(error => console.error('Error fetching film:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/film/${id}`, { judul, sinopsis, tanggal_publish, sutradara, studio});
                router.push('/film');
            } catch (error) {
                console.error('Error updating film:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Film</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="judul">Judul Film</label>
                            <input
                                id="judul"
                                type="text"
                                value={judul}
                                onChange={e => setJudul(e.target.value)}
                                placeholder="Judul Film"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Sinopsis</label>
                            <input
                                id="sinopsis"
                                type="text"
                                value={sinopsis}
                                onChange={e => setSinopsis(e.target.value)}
                                placeholder="Sinopsis"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Tanggal Publish</label>
                            <input
                                id="tanggal_publish"
                                type="date"
                                value={tanggal_publish}
                                onChange={e => setTanggalPublish(e.target.value)}
                                placeholder="Tanggal Publish"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Sutradara</label>
                            <input
                                id="sutradara"
                                type="text"
                                value={sutradara}
                                onChange={e => setSutradara(e.target.value)}
                                placeholder="Sutradara"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Studio</label>
                            <input
                                id="studio"
                                type="text"
                                value={studio}
                                onChange={e => setStudio(e.target.value)}
                                placeholder="Studio"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;