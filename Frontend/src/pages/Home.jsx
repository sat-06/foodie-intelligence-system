import React, { useState } from 'react';
import styles from './Home.module.css';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { summaryMetrics } from '../data/mockData';
import { 
  ShoppingCart, Users, Store, TrendingUp, DollarSign, 
  Zap, Brain, PieChart, Database, Sparkles 
} from 'lucide-react';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <Sparkles size={16} />
            Welcome to Foodie Intelligence
          </div>
          
          <h1 className={styles.heroTitle}>
            Intelligent Food Delivery Analytics
            <span className={styles.highlight}> Platform</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Unlock powerful insights with AI-driven analytics and smart recommendations. 
            Optimize your food delivery operations with real-time data intelligence.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              <span>Start Exploring</span>
              <Zap size={18} />
            </button>
            <button className={styles.secondaryBtn}>
              Learn More
            </button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10M+</span>
              <span className={styles.statLabel}>Orders Analyzed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500K+</span>
              <span className={styles.statLabel}>Customers Tracked</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>2.5M+</span>
              <span className={styles.statLabel}>Insights Generated</span>
            </div>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.orb}></div>
          <div className={styles.orbGlow}></div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.metricsSection}>
        <SectionHeader 
          title="Performance Overview"
          subtitle="Key metrics at a glance"
          icon={TrendingUp}
        />
        
        <div className={styles.metricsGrid}>
          <StatCard
            title="Total Orders"
            value={summaryMetrics.totalOrders}
            icon={ShoppingCart}
            trend={12}
            trendLabel="vs last month"
            gradient="gradient-orange"
            delay={0}
          />
          <StatCard
            title="Active Customers"
            value={summaryMetrics.totalCustomers}
            icon={Users}
            trend={8}
            trendLabel="vs last month"
            gradient="gradient-cool"
            delay={100}
          />
          <StatCard
            title="Restaurants"
            value={summaryMetrics.totalRestaurants}
            icon={Store}
            trend={5}
            trendLabel="vs last month"
            gradient="gradient-amber"
            delay={200}
          />
          <StatCard
            title="Avg Order Value"
            value={`₹${summaryMetrics.averageOrderValue}`}
            icon={DollarSign}
            trend={-3}
            trendLabel="vs last month"
            gradient="gradient-orange"
            delay={300}
          />
        </div>
      </section>

      {/* Data Pipeline Section */}
      <section className={styles.pipelineSection}>
        <SectionHeader 
          title="Intelligent Data Pipeline"
          subtitle="From raw data to actionable insights"
          icon={Database}
        />

        <div className={styles.pipeline}>
          <div className={styles.pipelineStep}>
            <GlassCard variant="elevated">
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <Database size={28} />
                </div>
                <h4>Data Ingestion</h4>
                <p>Extract and aggregate order data from multiple sources in real-time</p>
              </div>
            </GlassCard>
          </div>

          <div className={styles.pipelineArrow}>
            <div className={styles.arrowHead}></div>
          </div>

          <div className={styles.pipelineStep}>
            <GlassCard variant="elevated">
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <PieChart size={28} />
                </div>
                <h4>Data Processing</h4>
                <p>Clean, validate, and transform raw data into structured formats</p>
              </div>
            </GlassCard>
          </div>

          <div className={styles.pipelineArrow}>
            <div className={styles.arrowHead}></div>
          </div>

          <div className={styles.pipelineStep}>
            <GlassCard variant="elevated">
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <Brain size={28} />
                </div>
                <h4>Analysis & ML</h4>
                <p>Apply statistical models and machine learning for pattern discovery</p>
              </div>
            </GlassCard>
          </div>

          <div className={styles.pipelineArrow}>
            <div className={styles.arrowHead}></div>
          </div>

          <div className={styles.pipelineStep}>
            <GlassCard variant="elevated">
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <Sparkles size={28} />
                </div>
                <h4>Intelligence</h4>
                <p>Generate insights and AI-powered recommendations for action</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <SectionHeader 
          title="Platform Features"
          subtitle="Everything you need to optimize your business"
          icon={Zap}
        />

        <div className={styles.featuresGrid}>
          <GlassCard 
            variant="accent"
            interactive
            onMouseEnter={() => setHoveredFeature(0)}
            onMouseLeave={() => setHoveredFeature(null)}
            className={hoveredFeature === 0 ? styles.activeFeature : ''}
          >
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.icon1}`}>
                <TrendingUp size={32} />
              </div>
              <h3>Advanced Analytics</h3>
              <p>Deep dive into order patterns, customer behavior trends, and market analysis with interactive visualizations</p>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Real-time</span>
                <span className={styles.tag}>Interactive</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard 
            variant="accent"
            interactive
            onMouseEnter={() => setHoveredFeature(1)}
            onMouseLeave={() => setHoveredFeature(null)}
            className={hoveredFeature === 1 ? styles.activeFeature : ''}
          >
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.icon2}`}>
                <Brain size={32} />
              </div>
              <h3>Smart Recommendations</h3>
              <p>AI-powered recommendation engine that learns from customer preferences and behavior patterns</p>
              <div className={styles.featureTags}>
                <span className={styles.tag}>ML Powered</span>
                <span className={styles.tag}>Personalized</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard 
            variant="accent"
            interactive
            onMouseEnter={() => setHoveredFeature(2)}
            onMouseLeave={() => setHoveredFeature(null)}
            className={hoveredFeature === 2 ? styles.activeFeature : ''}
          >
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.icon3}`}>
                <Users size={32} />
              </div>
              <h3>Customer Insights</h3>
              <p>Segment customers based on spending patterns, preferences, and ordering frequency for targeted actions</p>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Segmentation</span>
                <span className={styles.tag}>Behavioral</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard 
            variant="accent"
            interactive
            onMouseEnter={() => setHoveredFeature(3)}
            onMouseLeave={() => setHoveredFeature(null)}
            className={hoveredFeature === 3 ? styles.activeFeature : ''}
          >
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.icon4}`}>
                <Store size={32} />
              </div>
              <h3>Restaurant Analytics</h3>
              <p>Monitor restaurant performance with revenue trends, customer ratings, and operational insights</p>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Performance</span>
                <span className={styles.tag}>Monitoring</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <GlassCard variant="elevated" className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Food Delivery Business?</h2>
            <p>Join thousands of successful restaurants and platforms using our intelligence system</p>
            <button className={styles.ctaButton}>
              Get Started Today
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
