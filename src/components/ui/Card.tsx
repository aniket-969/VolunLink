import { FC } from 'react';
import { formatUpdatedAt, formatDate } from '@/helpers/formatData';

interface Location {
    type: "Point";
    coordinates: [number, number];
    country?: string;
    county?: string;
    road?: string;
    state?: string;
    village?: string;
    state_district?: string;
}

interface Post {
    _id: string;
    createdBy: {
        _id: string;
        username: string;
    };
    title: string;
    description: string;
    location: Location;
    images: string;
    contactEmail: string;
    contactPhone: string;
    startDate: string;
    endDate: string;
    role: string;
    skills: {
        _id: string;
        skillName: string;
        skillDescription: string;
    };
    category: {
        _id: string;
        categoryName: string;
        categoryDescription: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CardProps {
    post: Post;
}

const Card: FC<CardProps> = ({ post }) => {
    return (
        <div key={post._id} className='pop1 flex flex-col gap-4 mx-5 my-2 px-5 py-4 rounded-2xl '>
            <div className='flex items-center gap-5 justify-between'>
                <div className='flex flex-col '>
                    <div className='flex items-center text-sm md:text-lg max-w-[12rem]'>
                        <span className="mx-2 h-4 w-[2.5px] bg-dark"></span>
                        <p className='truncate'>@{post.createdBy.username}</p>
                    </div>
                    <p className='text-xs'>{`${formatUpdatedAt(post.updatedAt)}`}</p>
                </div>
                <div className='text-xs'>
                    {`${formatDate(post.startDate)} - ${formatDate(post.endDate)}`}
                </div>
            </div>
            <div>
                <img src={post.images} className="w-full max-h-[16rem] my-2 rounded-xl sm:max-h-[25rem]" alt="" />
            </div>
            <div className='mt-6'>
                <div>
                    <p className='text-base md:text-lg'>{post.title}</p>
                    <p className='line-clamp-2 text-sm md:text-base'>{post.description}</p>
                </div>
                <div className='text-sm md:text-base'>
                    <p>Email: {post.contactEmail}</p>
                    <p>Phone: {post.contactPhone}</p>
                </div>
            </div>
            {post.skills ? (
                <p className='text-sm md:text-base'>Skills - {post.skills.skillName}</p>
            ) : post.category ? (
                <p className='text-sm md:text-base'>Category - {post.category.categoryName}</p>
            ) : null}
            <div className='flex justify-center items-center mt-3'>
                <p className='text-xs flex items-center justify-center w-[19rem]'>
                    Posted from: {post.location.road}, {post.location.village}, {post.location.county}, {post.location.state}, {post.location.country}
                </p>
            </div>
        </div>
    );
};

export default Card;
