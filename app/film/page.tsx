'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface FilmItem {
    id: number;
    judul: string;
    sinopsis: string;
    tanggal_publish: string;
    sutradara: string;
    studio: string;
    genre: {
        id:number
        nama:string
        deskripsi:string
        created_at:string
        updated_at:string
    };
}

const Film = () => {

    const [film, setFilm] = useState<FilmItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/film`)
            .then(response => {
                setFilm(response.data.data);
            })
            .catch(error => console.error('Error fetching film items:', error));
    }, []);

    const deleteFilm = (id: number) => {
        axios.delete(`http://localhost:8000/api/film/${id}`)
            .then(() => setFilm(film.filter(film => film.id !== id)))
            .catch(error => console.error('Error deleting film:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pendaftaran Film</h1>
                    <div className="mb-6">
                        <Link href="/film/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Film</button>
                        </Link>
                    </div>
                    {film.length > 0 ? (
                        <ul>
                            {film.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.judul}</h2>
                                        <p className="text-gray-600">Genre: {item.genre.nama}</p>
                                        <p className="text-gray-600">Sinopsis: {item.sinopsis}</p>
                                        <p className="text-gray-600">Tanggal Publish: {item.tanggal_publish}</p>
                                        <p className="text-gray-600">Sutradara: {item.sutradara}</p>
                                        <p className="text-gray-600">Studio: {item.studio}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/film/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deleteFilm(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Film kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Film;