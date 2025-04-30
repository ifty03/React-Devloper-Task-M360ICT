import { Menu, Button, Drawer, Badge, Input, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  User,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const menuItems = [
    { key: "home", label: "Home",path:"/" },
    { key: "products", label: "Products", path:"/" },
  ];
  return (
    <Header className="bg-white px-4 h-16 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 mr-8">M360ICT</Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <Menu mode="horizontal" items={menuItems} className="border-0" />
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center space-x-4">
        <Button
          type="text"
          icon={<Search className="w-5 h-5" />}
          onClick={() => setSearchVisible(!searchVisible)}
        />

        <Button type="text" icon={<Heart className="w-5 h-5" />} />

        <Badge count={3}>
          <Button type="text" icon={<ShoppingCart className="w-5 h-5" />} />
        </Badge>

        <Avatar icon={<User className="w-4 h-4" />} />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center space-x-3">
        <Badge count={3}>
          <Button type="text" icon={<ShoppingCart className="w-5 h-5" />} />
        </Badge>
        <Button
          type="text"
          icon={<MenuIcon className="w-5 h-5" />}
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>

      {/* Search Bar Overlay */}
      {searchVisible && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 border-t border-gray-200">
          <Input.Search
            placeholder="Search products..."
            size="large"
            onSearch={() => setSearchVisible(false)}
          />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <div className="flex flex-col space-y-4">
          <Menu mode="vertical" items={menuItems} />
          <div className="border-t border-gray-200 pt-4 flex items-center">
            <Button
              type="text"
              icon={<Search className="w-5 h-5" />}
              block
              className="text-left"
            >
              Search
            </Button>
            <Button
              type="text"
              icon={<Heart className="w-5 h-5" />}
              block
              className="text-left"
            >
              Wishlist
            </Button>
            <Button
              type="text"
              icon={<User className="w-5 h-5" />}
              block
              className="text-left"
            >
              Account
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
