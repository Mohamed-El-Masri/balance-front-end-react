import React from 'react';
import { Target, Eye, Award, Users, Building, TrendingUp, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import styles from '../../styles/components/public/About.module.css';

const AboutPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      pageTitle: 'About Balance Real Estate',
      pageSubtitle: 'Building dreams, creating communities, and shaping the future of real estate in Saudi Arabia',
      ourStory: 'Our Story',
      storyContent: 'Founded in 2010, Balance Real Estate has been at the forefront of Saudi Arabia\'s real estate transformation. We began with a simple vision: to create exceptional living and working spaces that enhance people\'s lives while contributing to the Kingdom\'s Vision 2030. Over the years, we have grown from a small family business to one of the most trusted names in Saudi real estate development.',
      ourMission: 'Our Mission',
      missionContent: 'To develop innovative, sustainable, and high-quality real estate projects that meet the evolving needs of modern Saudi society while preserving our cultural heritage and contributing to economic growth.',
      ourVision: 'Our Vision',
      visionContent: 'To be the leading real estate developer in Saudi Arabia, recognized for our commitment to excellence, innovation, and customer satisfaction, while playing a pivotal role in shaping the future of urban development in the Kingdom.',
      ourValues: 'Our Values',
      whyChooseUs: 'Why Choose Balance Real Estate?',
      stats: {
        projectsCompleted: 'Projects Completed',
        yearsExperience: 'Years of Experience',
        happyClients: 'Happy Clients',
        citiesCovered: 'Cities Covered'
      },
      values: [
        {
          title: 'Excellence',
          description: 'We strive for the highest standards in every project we undertake, ensuring quality that exceeds expectations.'
        },
        {
          title: 'Innovation',
          description: 'We embrace cutting-edge technology and creative solutions to deliver modern, sustainable developments.'
        },
        {
          title: 'Integrity',
          description: 'We conduct business with transparency, honesty, and ethical practices in all our dealings.'
        },
        {
          title: 'Customer Focus',
          description: 'Our clients are at the heart of everything we do, and we are committed to exceeding their expectations.'
        }
      ],
      features: [
        {
          title: 'Premium Locations',
          description: 'Strategic locations in prime areas across major Saudi cities'
        },
        {
          title: 'Quality Construction',
          description: 'Using the finest materials and latest construction techniques'
        },
        {
          title: 'Modern Amenities',
          description: 'State-of-the-art facilities and services for modern living'
        },
        {
          title: 'Investment Value',
          description: 'Properties designed to appreciate in value over time'
        },
        {
          title: 'Customer Service',
          description: '24/7 support and after-sales service for all our clients'
        },
        {
          title: 'Sustainability',
          description: 'Eco-friendly developments that respect the environment'
        }
      ],
      timeline: {
        title: 'Our Journey',
        events: [
          {
            year: '2010',
            title: 'Company Founded',
            description: 'Balance Real Estate was established with a vision to transform Saudi real estate'
          },
          {
            year: '2013',
            title: 'First Major Project',
            description: 'Completed our first residential complex in Riyadh with 200 units'
          },
          {
            year: '2016',
            title: 'Expansion',
            description: 'Expanded operations to Jeddah and Dammam'
          },
          {
            year: '2019',
            title: 'Innovation Award',
            description: 'Received the Saudi Real Estate Innovation Award'
          },
          {
            year: '2022',
            title: 'Sustainability Focus',
            description: 'Launched our green building initiative aligned with Vision 2030'
          },
          {
            year: '2024',
            title: 'Digital Transformation',
            description: 'Implemented cutting-edge technology across all operations'
          }
        ]
      }
    },
    ar: {
      pageTitle: 'عن شركة بالنس للتطوير العقاري',
      pageSubtitle: 'نبني الأحلام، ننشئ المجتمعات، ونشكل مستقبل العقارات في المملكة العربية السعودية',
      ourStory: 'قصتنا',
      storyContent: 'تأسست شركة بالنس للتطوير العقاري عام 2010، وكانت في المقدمة في تحول القطاع العقاري السعودي. بدأنا برؤية بسيطة: إنشاء مساحات معيشة وعمل استثنائية تعزز حياة الناس مع المساهمة في رؤية المملكة 2030. على مر السنين، نمونا من شركة عائلية صغيرة إلى واحدة من أكثر الأسماء الموثوقة في تطوير العقارات السعودية.',
      ourMission: 'رسالتنا',
      missionContent: 'تطوير مشاريع عقارية مبتكرة ومستدامة وعالية الجودة تلبي الاحتياجات المتطورة للمجتمع السعودي الحديث مع الحفاظ على تراثنا الثقافي والمساهمة في النمو الاقتصادي.',
      ourVision: 'رؤيتنا',
      visionContent: 'أن نكون الشركة الرائدة في التطوير العقاري في المملكة العربية السعودية، معترف بها لالتزامنا بالتميز والابتكار ورضا العملاء، مع لعب دور محوري في تشكيل مستقبل التطوير العمراني في المملكة.',
      ourValues: 'قيمنا',
      whyChooseUs: 'لماذا تختار بالنس للتطوير العقاري؟',
      stats: {
        projectsCompleted: 'مشروع مكتمل',
        yearsExperience: 'سنة من الخبرة',
        happyClients: 'عميل راضٍ',
        citiesCovered: 'مدينة نخدمها'
      },
      values: [
        {
          title: 'التميز',
          description: 'نسعى لأعلى المعايير في كل مشروع نتولاه، ونضمن جودة تفوق التوقعات.'
        },
        {
          title: 'الابتكار',
          description: 'نتبنى أحدث التقنيات والحلول الإبداعية لتقديم مشاريع حديثة ومستدامة.'
        },
        {
          title: 'النزاهة',
          description: 'نمارس الأعمال بشفافية وصدق وممارسات أخلاقية في جميع تعاملاتنا.'
        },
        {
          title: 'التركيز على العميل',
          description: 'عملاؤنا في قلب كل ما نفعله، ونحن ملتزمون بتجاوز توقعاتهم.'
        }
      ],
      features: [
        {
          title: 'مواقع مميزة',
          description: 'مواقع استراتيجية في أرقى المناطق عبر المدن السعودية الرئيسية'
        },
        {
          title: 'جودة البناء',
          description: 'استخدام أجود المواد وأحدث تقنيات البناء'
        },
        {
          title: 'وسائل راحة حديثة',
          description: 'مرافق وخدمات متطورة للعيش العصري'
        },
        {
          title: 'قيمة استثمارية',
          description: 'عقارات مصممة لتزداد قيمتها مع مرور الوقت'
        },
        {
          title: 'خدمة العملاء',
          description: 'دعم على مدار الساعة وخدمة ما بعد البيع لجميع عملائنا'
        },
        {
          title: 'الاستدامة',
          description: 'مشاريع صديقة للبيئة تحترم البيئة'
        }
      ],
      timeline: {
        title: 'رحلتنا',
        events: [
          {
            year: '2010',
            title: 'تأسيس الشركة',
            description: 'تأسست بالنس للتطوير العقاري برؤية لتحويل العقارات السعودية'
          },
          {
            year: '2013',
            title: 'أول مشروع كبير',
            description: 'أتممنا أول مجمع سكني في الرياض بـ 200 وحدة'
          },
          {
            year: '2016',
            title: 'التوسع',
            description: 'توسعت العمليات إلى جدة والدمام'
          },
          {
            year: '2019',
            title: 'جائزة الابتكار',
            description: 'حصلنا على جائزة الابتكار العقاري السعودي'
          },
          {
            year: '2022',
            title: 'التركيز على الاستدامة',
            description: 'أطلقنا مبادرة البناء الأخضر متماشية مع رؤية 2030'
          },
          {
            year: '2024',
            title: 'التحول الرقمي',
            description: 'طبقنا تقنيات متطورة عبر جميع العمليات'
          }
        ]
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const statsData = [
    { icon: Building, value: '150+', label: t.stats.projectsCompleted },
    { icon: Award, value: '14+', label: t.stats.yearsExperience },
    { icon: Users, value: '5000+', label: t.stats.happyClients },
    { icon: TrendingUp, value: '12+', label: t.stats.citiesCovered }
  ];

  const valueIcons = [Target, Eye, Shield, Heart];

  return (
    <div className={styles.about} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className={styles.about__hero}>
        <div className={styles.about__hero_content}>
          <h1 className={styles.about__title}>{t.pageTitle}</h1>
          <p className={styles.about__subtitle}>{t.pageSubtitle}</p>
        </div>
        <div className={styles.about__hero_image}>
          <img 
            src="/images/about-hero.jpg" 
            alt="Balance Real Estate" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-hero.jpg';
            }}
          />
        </div>
      </section>

      <div className={styles.about__container}>
        {/* Stats Section */}
        <section className={styles.about__stats}>
          <div className={styles.about__stats_grid}>
            {statsData.map((stat, index) => (
              <div key={index} className={styles.about__stat_card}>
                <div className={styles.about__stat_icon}>
                  <stat.icon size={32} />
                </div>
                <div className={styles.about__stat_content}>
                  <span className={styles.about__stat_value}>{stat.value}</span>
                  <span className={styles.about__stat_label}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.about__section}>
          <div className={styles.about__section_grid}>
            <div className={styles.about__section_content}>
              <h2 className={styles.about__section_title}>{t.ourStory}</h2>
              <p className={styles.about__section_text}>{t.storyContent}</p>
            </div>
            <div className={styles.about__section_image}>
              <img 
                src="/images/about-story.jpg" 
                alt="Our Story"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-story.jpg';
                }}
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.about__mission_vision}>
          <div className={styles.about__mv_grid}>
            <div className={styles.about__mv_card}>
              <div className={styles.about__mv_icon}>
                <Target size={40} />
              </div>
              <h3 className={styles.about__mv_title}>{t.ourMission}</h3>
              <p className={styles.about__mv_text}>{t.missionContent}</p>
            </div>
            <div className={styles.about__mv_card}>
              <div className={styles.about__mv_icon}>
                <Eye size={40} />
              </div>
              <h3 className={styles.about__mv_title}>{t.ourVision}</h3>
              <p className={styles.about__mv_text}>{t.visionContent}</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.about__values}>
          <h2 className={styles.about__section_title}>{t.ourValues}</h2>
          <div className={styles.about__values_grid}>
            {t.values.map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <div key={index} className={styles.about__value_card}>
                  <div className={styles.about__value_icon}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className={styles.about__value_title}>{value.title}</h3>
                  <p className={styles.about__value_text}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.about__features}>
          <h2 className={styles.about__section_title}>{t.whyChooseUs}</h2>
          <div className={styles.about__features_grid}>
            {t.features.map((feature, index) => (
              <div key={index} className={styles.about__feature_card}>
                <h3 className={styles.about__feature_title}>{feature.title}</h3>
                <p className={styles.about__feature_text}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.about__timeline}>
          <h2 className={styles.about__section_title}>{t.timeline.title}</h2>
          <div className={styles.about__timeline_container}>
            {t.timeline.events.map((event, index) => (
              <div key={index} className={styles.about__timeline_item}>
                <div className={styles.about__timeline_marker}>
                  <span className={styles.about__timeline_year}>{event.year}</span>
                </div>
                <div className={styles.about__timeline_content}>
                  <h3 className={styles.about__timeline_title}>{event.title}</h3>
                  <p className={styles.about__timeline_text}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.about__cta}>
          <div className={styles.about__cta_content}>
            <h2 className={styles.about__cta_title}>
              {isArabic ? 'هل أنت مستعد للانضمام إلى عائلة بالنس؟' : 'Ready to Join the Balance Family?'}
            </h2>
            <p className={styles.about__cta_text}>
              {isArabic 
                ? 'اكتشف مشاريعنا الحصرية واستثمر في مستقبلك العقاري اليوم'
                : 'Discover our exclusive projects and invest in your real estate future today'
              }
            </p>
            <div className={styles.about__cta_buttons}>
              <a href="/projects" className={styles.about__cta_btn_primary}>
                {isArabic ? 'استكشف مشاريعنا' : 'Explore Our Projects'}
              </a>
              <a href="/contact" className={styles.about__cta_btn_secondary}>
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
