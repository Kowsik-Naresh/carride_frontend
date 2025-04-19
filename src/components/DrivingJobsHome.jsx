import React, { useEffect, useState } from 'react'
import { Button, Container} from "react-bootstrap";
import "../css/jobs.css";
import { Link } from "react-router-dom";
const DrivingJobsHome = () => {
  const [filteredJobs,setFilteredJobs]=useState([]);
  const jobs = [
      {
        id: 1,
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        type: "Full-time",
        description:
          "Develop and maintain web applications using modern frameworks.",
        lpa: 15,
      },
      {
        id: 2,
        title: "Marketing Intern",
        company: "Creative Minds",
        location: "Remote",
        type: "Internship",
        description: "Assist in social media marketing and content creation.",
        stipend: 15000,
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "Data Insights",
        location: "San Francisco, CA",
        type: "Full-time",
        description:
          "Analyze and interpret complex data to help drive business decisions.",
        lpa: 12,
      },
      {
        id: 4,
        title: "Graphic Design Intern",
        company: "Design Hub",
        location: "Los Angeles, CA",
        type: "Internship",
        description:
          "Support the design team in creating digital and print media.",
        stipend: 10000,
      },
      {
        id: 5,
        title: "Product Manager",
        company: "Innovate LLC",
        location: "Austin, TX",
        type: "Full-time",
        description: "Oversee product development from concept to launch.",
        lpa: 18,
      }]
      useEffect(()=>{
        setFilteredJobs(jobs)
      },[])
      const alphabetColors = {
        A: "#FF5733",
        B: "#33FF57",
        C: "#3357FF",
        D: "#FF33A6",
        E: "#FF8C33",
        F: "#8C33FF",
        G: "#33FFD1",
        H: "#D1FF33",
        I: "#FF3333",
        J: "#33FF8C",
        K: "#A633FF",
        L: "#33A6FF",
        M: "#FF3380",
        N: "#80FF33",
        O: "#3380FF",
        P: "#FF7033",
        Q: "#FF33D1",
        R: "#70FF33",
        S: "#FF5733",
        T: "#33FFA6",
        U: "#33A6FF",
        V: "#FF33C0",
        W: "#C0FF33",
        X: "#33C0FF",
        Y: "#FF3380",
        Z: "#80FF33",
      };
      const getCompanyLogo = (name) => {
        const initials = name
          .split(" ")
          .slice(0, 3)
          .map((word) => word[0])
          .join("");
        return initials;
      };  
  return (
    <div>
       <div className="relative  flex items-center justify-center">
        <img
        style={{width:"90%",marginTop:"-19px"}}
          src="/carNs.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        </div>
               
          <Container>
             <div className="jobs-container">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job">
                <div>
                  <div className="company">
                    <div
                      className="company-log"
                      style={{
                        backgroundColor:
                          alphabetColors[getCompanyLogo(job.company)[0]] || "#ccc",
                      }}
                    >
                      {getCompanyLogo(job.company)}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h3>{job.title}</h3>
                    <div>
                      <span className="attribute">Company: </span> {job.company}
                    </div>
                  </div>
                  <div>
                    <Button
                      as={Link}
                      to={`/jobs-and-internships-and-hackathons/${job._id}`}
                      style={{
                        marginRight: "30px",
                        padding: "10px",
                        width: "100px",
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                <div className="job-details">
                  <div>
                    <span className="attribute">Location: </span> {job.location}
                  </div>
                  <div>
                    <span className="attribute">Job Type: </span> {job.type}
                  </div>
                  <div>
                    <span className="attribute">Salary: </span>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>  
    </div>
  )
}

export default DrivingJobsHome
