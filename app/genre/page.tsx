'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface GenreItem {
    id: number;
    nama: string;
    deskripsi: string;
    // kategori: {
    //     id:number
    //     nama:string
    //     deskripsi:string
    //     created_at:string
    //     updated_at:string
    // };
}

const Genre = () => {

    const [genre, setGenre] = useState<GenreItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/genre`)
            .then(response => {
                setGenre(response.data.data);
            })
            .catch(error => console.error('Error fetching genre items:', error));
    }, []);

    const deleteGenre = (id: number) => {
        axios.delete(`http://localhost:8000/api/genre/${id}`)
            .then(() => setGenre(genre.filter(genre => genre.id !== id)))
            .catch(error => console.error('Error deleting genre:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pendaftaran Genre</h1>
                    <div className="mb-6">
                        <Link href="/genre/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Genre</button>
                        </Link>
                    </div>
                    {genre.length > 0 ? (
                        <ul>
                            {genre.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama}</h2>
                                        <p className="text-gray-600">Deskripsi: {item.deskripsi}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/genre/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deleteGenre(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Genre kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Genre;