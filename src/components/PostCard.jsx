import service from "../appwrite/config"
import { Link } from "react-router"

function PostCard({$id, title ,featuredImage, featuredimage}) {
  const imageId = featuredimage || featuredImage;
  const previewUrl = imageId ? service.getFilePreview(imageId) : "";
  console.log("PostCard preview URL:", previewUrl, "imageId:", imageId);
  return (
    <Link to={`/post/${$id}`}>
    <div className="w-full bg-gray-100 rounded-xl p-4">
        <div  className="w-full justify-center mb-4">
            <img src={previewUrl} alt={title} className="rounded-xl" onError={(e) => {
              console.error("Image load failed:", e.target.src);
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
            }} />

        </div>
        <h2 className="text-xl font-bold">{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard;
