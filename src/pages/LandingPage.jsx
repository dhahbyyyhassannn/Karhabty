import NavBar from '../layouts/NavBar';
import './landingpagestyle.css';
import MainInformations from '../layouts/MainInformations';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
            <div>
                <NavBar />
            </div>
            
            <section className="hero-section" id="hero">
                <div className="hero-overlay" />
                <MainInformations />
                <div className="hero-buttons">
                    <Link to="/rent" className="btn-hero btn-rent">
                        Start Renting
                    </Link>
                    <Link to="/sell" className="btn-hero btn-buy">
                        Buy Your Next Car
                    </Link>
                </div>
            </section>

            <section className="features-section" id="advantages">
                <h2 className="section-title">Why drivers choose Karhabty</h2>
                <p className="section-subtitle">A premium experience for car rental and car buying in one place.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Transparent pricing</h3>
                        <p>Clear rates with no hidden costs, whether you rent for a day or buy for the long term.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Trusted vehicles</h3>
                        <p>Every car is checked, clean, and ready for a safe and smooth journey.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast booking</h3>
                        <p>Reserve quickly with a simple flow designed to save time and reduce friction.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👨‍💼</div>
                        <h3>Support that stays with you</h3>
                        <p>Our team is ready to help before, during, and after every booking.</p>
                    </div>
                </div>
            </section>

            <section className="services-section" id="services">
                <h2 className="section-title">Services built around your journey</h2>
                <p className="section-subtitle">Rent for flexibility, buy for ownership, and choose the plan that fits your life.</p>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>🚙 Short-term rentals</h3>
                        <p>Perfect for weekend trips, business visits, and quick city mobility.</p>
                        <ul>
                            <li>✓ Available in multiple vehicle categories</li>
                            <li>✓ Flexible pickup and return</li>
                            <li>✓ Insurance-ready options</li>
                        </ul>
                    </div>
                    <div className="service-card">
                        <h3>📅 Long-term rentals</h3>
                        <p>Ideal for monthly use, long stays, and dependable everyday driving.</p>
                        <ul>
                            <li>✓ Better value for extended use</li>
                            <li>✓ Maintenance-focused plans</li>
                            <li>✓ Simple renewal options</li>
                        </ul>
                    </div>
                    <div className="service-card">
                        <h3>🏷️ Car marketplace</h3>
                        <p>Browse cars for sale and find the right match for your lifestyle and budget.</p>
                        <ul>
                            <li>✓ Wide selection of models</li>
                            <li>✓ Financing-friendly options</li>
                            <li>✓ Warranty-ready listings</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="stats-section" id="stats">
                <div className="stat-item">
                    <h3 className="stat-number">500+</h3>
                    <p>Cars available</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">10K+</h3>
                    <p>Happy customers</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">98%</h3>
                    <p>Satisfaction rate</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">50+</h3>
                    <p>Brands listed</p>
                </div>
            </section>

            <section className="cta-section" id="cta">
                <h2>Ready to drive your next story?</h2>
                <p>Join a platform built for easy renting, confident buying, and premium service.</p>
                <Link to="/rental" className="btn-cta">
                    Get rentals
                </Link>
                <Link to="/sale" className="btn-cta">
                    Get sales
                </Link>
            </section>
        </>
    )
}