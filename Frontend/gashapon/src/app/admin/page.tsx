import Link from "next/link";
import Image from 'next/image';
import "../globals.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button className="sign-out-btn">Sign out</button>
      </div>
      <div className="table-container">
        <div className="table-header">
          <h2>Elementos</h2>
        </div>
        {categories.map((element, index) => (
          <div key={index} className="table-element">
            <h3 className="table-element-name">{element.categoryName}</h3>
            <div className="table-btns">
              <Link href={`/admin${element.path}`} className="table-btn"> 
                <Image className="table-option-btn" src={"/icons/book.png"} alt={"View Icon"} width={40} height={40} />
                <p>Ver</p>
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

export const categories = [
  {
    id: 1,
    categoryName: 'Usuarios',
    path: '/users',
  },
  {
    id: 1,
    categoryName: 'Personajes',
    path: '/characters',
  },
  {
    id: 1,
    categoryName: 'Armas',
    path: '/weapons',
  },
];