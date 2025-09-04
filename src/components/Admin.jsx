import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';

// Custom modal component to replace window.confirm
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 max-w-sm w-full space-y-4">
                <h3 className="text-xl font-bold text-white">Confirm Action</h3>
                <p className="text-gray-300">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-300 rounded-md transition-colors hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-md transition-colors hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [modal, setModal] = useState({ isOpen: false, idToDelete: null });
    const navigate = useNavigate();

    useEffect(() => {
        const t = Cookies.get("lgc");
        if (t) {
            setLoading(true);
            axios.get("http://localhost:5000/admin")
                .then((res) => {
                    const formatted = res.data.map(user => ({
                        id: user._id,
                        name: user.name,
                        email: user._id,
                        designation: user.designation,
                        department: user.department,
                        phno: user.phno
                    }));
                    setRows(formatted);
                    setLoading(false);
                })
                .catch(() => {
                    setMessage({ text: "Failed to fetch users.", type: 'error' });
                    setLoading(false);
                });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleDeleteClick = (id) => () => {
        setModal({
            isOpen: true,
            idToDelete: id
        });
    };

    const handleConfirmDelete = () => {
        const id = modal.idToDelete;
        if (!id) return;

        const previousData = [...rows];
        setRows(rows.filter((row) => row.id !== id));
        setModal({ isOpen: false, idToDelete: null });

        axios.delete(`http://localhost:5000/del/${id}`)
            .then(() => {
                setMessage({ text: "User deleted successfully.", type: 'success' });
            })
            .catch(() => {
                setRows(previousData);
                setMessage({ text: "Failed to delete user. Please try again.", type: 'error' });
            });
    };

    const handleCancelDelete = () => {
        setModal({ isOpen: false, idToDelete: null });
    };

    const handleEditClick = (id) => () => {
        navigate(`/edit/${id}`);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 150,
            renderHeader: (params) => (
                <div className="text-indigo-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
        {
            field: 'email',
            headerName: 'Email (ID)',
            flex: 1.2,
            minWidth: 200,
            renderHeader: (params) => (
                <div className="text-purple-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
        {
            field: 'designation',
            headerName: 'Designation',
            flex: 1,
            minWidth: 150,
            renderHeader: (params) => (
                <div className="text-cyan-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
        {
            field: 'department',
            headerName: 'Department',
            flex: 1,
            minWidth: 150,
            renderHeader: (params) => (
                <div className="text-pink-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
        {
            field: 'phno',
            headerName: 'Phone Number',
            flex: 1,
            minWidth: 150,
            renderHeader: (params) => (
                <div className="text-pink-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            getActions: ({ id }) => [
                <Tooltip title="Edit User" key="edit">
                    <GridActionsCellItem
                        icon={<EditIcon className="text-indigo-400 hover:text-indigo-300" />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                    />
                </Tooltip>,
                <Tooltip title="Delete User" key="delete">
                    <GridActionsCellItem
                        icon={<DeleteIcon className="text-red-400 hover:text-red-300" />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="error"
                    />
                </Tooltip>,
            ],
            renderHeader: (params) => (
                <div className="text-red-400 font-medium">
                    {params.colDef.headerName}
                </div>
            )
        },
    ];

    if (loading) {
        return (
            <div className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-gray-900">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
                </div>
                <div className="relative z-10 text-center text-gray-400 text-lg font-medium animate-pulse">
                    Loading admin dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-start px-4 pt-16 pb-12 bg-gradient-to-br from-indigo-950 to-gray-900 font-sans">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800 space-y-6 mt-16">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h2>
                    <p className="text-gray-400 mt-2">Manage users and monitor system activity</p>
                </div>

                {/* Message Box */}
                {message.text && (
                    <div className={`p-4 rounded-md text-center ${message.type === 'success' ? 'bg-green-800/70 text-green-300' : 'bg-red-800/70 text-red-300'} border border-gray-700`}>
                        {message.text}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm text-center border border-gray-700">
                        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">{rows.length}</div>
                        <div className="text-sm font-medium text-gray-300">Total Users</div>
                    </div>
                    <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm text-center border border-gray-700">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{rows.filter(row => row.designation).length}</div>
                        <div className="text-sm font-medium text-gray-300">With Designation</div>
                    </div>
                    <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm text-center border border-gray-700">
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">{new Set(rows.map(row => row.department)).size}</div>
                        <div className="text-sm font-medium text-gray-300">Departments</div>
                    </div>
                </div>

                {/* DataGrid */}
                <Box sx={{ width: '100%', mt: 4 }}>
                    {rows.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableRowSelectionOnClick
                            pageSizeOptions={[5, 10, 25]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            sx={{
                                minHeight: 500,
                                border: 'none',
                                borderRadius: '8px',
                                backgroundColor: 'rgb(31 41 55 / 0.5)', // bg-gray-900/50
                                color: '#d1d5db', // text-gray-300
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                    borderRadius: '8px',
                                },
                                '& .MuiDataGrid-cell': {
                                    padding: '8px',
                                    color: '#d1d5db',
                                    borderBottom: '1px solid #4b5563', // border-gray-600
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#1f2937 !important', // Force dark gray background
                                    color: '#d1d5db !important',
                                    fontWeight: 600,
                                    borderBottom: '1px solid #4b5563',
                                    '& .MuiDataGrid-columnHeader': {
                                        backgroundColor: '#1f2937 !important', // Ensure each header cell has dark background
                                    },
                                    '& .MuiDataGrid-columnHeaderTitle': {
                                        color: '#d1d5db !important',
                                        fontWeight: 600,
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        color: '#4b5563',
                                    },
                                    '& .MuiDataGrid-sortIcon': {
                                        color: '#d1d5db',
                                    },
                                    '& .MuiDataGrid-menuIconButton': {
                                        color: '#d1d5db',
                                    }
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: '#1f2937 !important',
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#374151', // bg-gray-700
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: 'rgb(31 41 55 / 0.5)', // Same as table body
                                    color: '#d1d5db', // text-gray-300
                                    borderTop: '1px solid #4b5563', // border-gray-600
                                },
                                '& .MuiDataGrid-row': {
                                    cursor: 'default',
                                    borderBottom: '1px solid #4b5563', // border-gray-600
                                },
                                '& .MuiTablePagination-root': {
                                    color: '#d1d5db',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#d1d5db',
                                },
                                '& .MuiInputBase-root': {
                                    color: '#d1d5db',
                                }
                            }}
                        />
                    ) : (
                        <div className="text-center space-y-4 p-6 bg-gray-800/70 rounded-md border border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-100">No Users Found</h3>
                            <p className="text-gray-400">Currently, there are no users in the system.</p>
                        </div>
                    )}
                </Box>
            </div>
            <ConfirmationModal
                isOpen={modal.isOpen}
                message="Are you sure you want to delete this user?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
}