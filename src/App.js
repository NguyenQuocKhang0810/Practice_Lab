import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Badge,
  Modal,
  ListGroup,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/js/all.js";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "Pepperoni Pizza",
      price: 10.99,
      image: "/menu1.jpg",
      description:
        "Classic pepperoni pizza topped with mozzarella and a blend of herbs.",
    },
    {
      id: 2,
      name: "Pizza Margherita",
      price: 8.99,
      image: "/menu2.jpg",
      description:
        "A simple yet delicious pizza with fresh mozzarella, tomatoes, and basil.",
    },
    {
      id: 3,
      name: "BBQ Chicken Pizza",
      price: 12.99,
      image: "/menu3.jpg",
      description:
        "Savory BBQ sauce, grilled chicken, red onions, and cilantro on a crispy crust.",
    },
    {
      id: 4,
      name: "Vegetarian Pizza",
      price: 9.99,
      image: "/menu4.jpg",
      description:
        "A delightful mix of vegetables including bell peppers, and olives.",
    },
  ];

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  return (
    <Container>
      {/* Navbar */}
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Pizza House</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">About Us</Nav.Link>
                <Nav.Link href="#" disabled>
                  Contact
                </Nav.Link>
              </Nav>

              {/* Cart Button */}
              <Button
                variant="outline-danger"
                className="position-relative cart-icon"
                onClick={handleShowCart}
              >
                <i className="fas fa-shopping-cart"></i> {/* Cart Icon */}
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalItemsInCart}
                </Badge>
              </Button>

              {/* Search Bar */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>

      <Row>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img src="/pizza1.jpg" alt="Pepperoni Pizza" />
            <Carousel.Caption>
              <h3>Pepperoni Pizza</h3>
              <p>
                A timeless favorite with zesty pepperoni slices and gooey
                mozzarella cheese.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img src="/pizza2.jpg" alt="Pizza Margherita" />
            <Carousel.Caption>
              <h3>Pizza Margherita</h3>
              <p>
                Fresh tomatoes, creamy mozzarella, and basil leaves for a
                classic Italian taste.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img src="/pizza3.jpg" alt="BBQ Chicken Pizza" />
            <Carousel.Caption>
              <h3>BBQ Chicken Pizza</h3>
              <p>
                Smoky BBQ sauce with tender chicken, red onions, and a sprinkle
                of cilantro.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img src="/pizza4.jpg" alt="Vegetarian Pizza" />
            <Carousel.Caption>
              <h3>Vegetarian Pizza</h3>
              <p>
                A fresh medley of veggies, including bell peppers, mushrooms,
                and olives on a crispy crust.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img src="/pizza5.jpg" alt="Hawaiian Pizza" />
            <Carousel.Caption>
              <h3>Hawaiian Pizza</h3>
              <p>
                Sweet pineapple and savory ham come together for a tropical
                twist on a pizza classic.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      {/* Pizza Menu */}
      <Row className="mt-5 mb-5">
        {menuItems.map((menuItem) => (
          <Col key={menuItem.id} sm={12} md={6} lg={3}>
            <Card>
              <Card.Img variant="top" src={menuItem.image} />
              <Card.Body>
                <Card.Title>{menuItem.name}</Card.Title>
                <Card.Text>{menuItem.description}</Card.Text>
                <Card.Text>${menuItem.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(menuItem)}>
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.name} (${item.price.toFixed(2)}) x {item.quantity}
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>{" "}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
