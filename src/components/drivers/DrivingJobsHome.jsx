import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/jobs.css';

const DrivingJobsHome = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Develop and maintain web applications using modern frameworks.',
      lpa: 15,
    },
    {
      id: 2,
      title: 'Marketing Intern',
      company: 'Creative Minds',
      location: 'Remote',
      type: 'Internship',
      description: 'Assist in social media marketing and content creation.',
      stipend: 15000,
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Data Insights',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Analyze and interpret complex data to help drive business decisions.',
      lpa: 12,
    },
    {
      id: 4,
      title: 'Graphic Design Intern',
      company: 'Design Hub',
      location: 'Los Angeles, CA',
      type: 'Internship',
      description: 'Support the design team in creating digital and print media.',
      stipend: 10000,
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Innovate LLC',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Oversee product development from concept to launch.',
      lpa: 18,
    },
  ];

  useEffect(() => {
    setFilteredJobs(jobs);
  }, []);

  const alphabetColors = {
    A: '#FF5733', B: '#33FF57', C: '#3357FF', D: '#FF33A6', E: '#FF8C33',
    F: '#8C33FF', G: '#33FFD1', H: '#D1FF33', I: '#FF3333', J: '#33FF8C',
    K: '#A633FF', L: '#33A6FF', M: '#FF3380', N: '#80FF33', O: '#3380FF',
    P: '#FF7033', Q: '#FF33D1', R: '#70FF33', S: '#FF5733', T: '#33FFA6',
    U: '#33A6FF', V: '#FF33C0', W: '#C0FF33', X: '#33C0FF', Y: '#FF3380', Z: '#80FF33',
  };

  const getCompanyLogo = (name) => {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('');
    return initials;
  };

  return (
    <div className="pt-4 pb-5" >

      <Container className="text-center mb-4 px-3">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <img
              src="/driving-job.png"
              alt="Hero"
              className="img-fluid"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>

          <Col xs={12} md={6}>
            <p className="caption mb-3" style={{ fontSize: '1.1rem', color: '#555' }}>
              Upload your driving jobs to get started
            </p>
            <Button
              variant="primary"
              size="lg"
              className="px-4 py-2 rounded-pill"
              onClick={() => alert('Upload functionality goes here')}
            >
              Upload Driving Jobs
            </Button>
          </Col>
        </Row>
      </Container>


      <Container>
        <Row className="g-4">
          {filteredJobs.map((job) => (
            <Col key={job.id} xs={12} sm={12} md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-sm job-card position-relative"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.96), rgba(245, 245, 245, 0.96)), url(/steering-wheel.png)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top right',
                  backgroundSize: '150px auto',
                  backgroundOrigin: 'content-box',
                }}
              >



                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle text-white fw-semibold d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor:
                          alphabetColors[getCompanyLogo(job.company)[0]] || '#6c757d',
                        fontSize: '16px',
                      }}
                    >
                      {getCompanyLogo(job.company)}
                    </div>
                    <div>
                      <h5 className="mb-1 fw-semibold">{job.title}</h5>
                      <small className="text-muted">{job.company}</small>
                    </div>
                  </div>

                  <Card.Text style={{ fontSize: '0.95rem' }}>
                    <div><strong>📍 Location:</strong> {job.location}</div>
                    <div><strong>🕒 Type:</strong> {job.type}</div>
                    <div>
                      <strong>💰 {job.type === 'Internship' ? 'Stipend:' : 'Salary:'}</strong>{' '}
                      {job.type === 'Internship'
                        ? `₹${job.stipend}/month`
                        : `${job.lpa} LPA`}
                    </div>
                  </Card.Text>

                  <div className="d-flex justify-content-end mt-3">
                    <Button
                      as={Link}
                      to={`/jobs-and-internships-and-hackathons/${job.id}`}
                      variant="primary"
                      className="px-4"
                    >
                      Apply
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DrivingJobsHome;
