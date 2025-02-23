import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: null,
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInput = () => {
        if (!input.fullname.trim()) return 'Full name is required';
        if (!/\S+@\S+\.\S+/.test(input.email)) return 'Invalid email address';
        if (!/^\d{10}$/.test(input.phoneNumber)) return 'Phone number must be 10 digits';
        if (input.password.length < 8) return 'Password must be at least 8 characters';
        if (!input.role) return 'Please select a role';
        return null;
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                toast.error('File size should not exceed 2MB');
                return;
            }
            setInput({ ...input, file });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            toast.error(error);
            return;
        }

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    
                    {/* Full Name */}
                    <div className='my-2'>
                        <Label htmlFor='fullname'>Full Name</Label>
                        <Input
                            id='fullname'
                            type='text'
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                            placeholder='Enter your name'
                        />
                    </div>
                    
                    {/* Email */}
                    <div className='my-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='xyz@gmail.com'
                        />
                    </div>
                    
                    {/* Phone Number */}
                    <div className='my-2'>
                        <Label htmlFor='phoneNumber'>Phone Number</Label>
                        <Input
                            id='phoneNumber'
                            type='text'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            placeholder='8080808080'
                        />
                    </div>
                    
                    {/* Password */}
                    <div className='my-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='Enter a strong password'
                        />
                    </div>
                    
                    {/* Role Selection */}
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='candidate'
                                    checked={input.role === 'candidate'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor='candidate'>Candidate</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor='recruiter'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        
                        {/* Profile Picture Input */}
                        <div className='flex items-center gap-4 my-5'>
                            <Label htmlFor='file'>Profile</Label>
                            <Input
                                id='file'
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    {loading ? (
                        <Button className='w-full my-4'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full my-4'>Signup</Button>
                    )}
                    
                    <span className='text-sm'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
