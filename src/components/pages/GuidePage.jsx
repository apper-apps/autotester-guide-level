import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProTips from "@/components/organisms/ProTips";
import Prerequisites from "@/components/organisms/Prerequisites";
import Footer from "@/components/organisms/Footer";
import StepsList from "@/components/organisms/StepsList";
import Header from "@/components/organisms/Header";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { getPrerequisites, getProTips, getSteps } from "@/services/api/guideService";

const GuidePage = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [proTips, setProTips] = useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [prereqData, stepsData, tipsData] = await Promise.all([
        getPrerequisites(),
        getSteps(),
        getProTips()
      ]);
      
      setPrerequisites(prereqData);
      setSteps(stepsData);
      setProTips(tipsData);
    } catch (err) {
      setError("Failed to load guide content. Please try again.");
      console.error("Error loading guide data:", err);
    } finally {
      setLoading(false);
    }
};


  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Error
            title="Failed to Load Guide"
            message={error}
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  if (prerequisites.length === 0 && steps.length === 0 && proTips.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Empty
            title="No Guide Content Available"
            message="The guide content is not available at the moment. Please check back later."
            icon="FileText"
            onAction={loadData}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      {prerequisites.length > 0 && (
        <Prerequisites prerequisites={prerequisites} />
      )}
      
      {steps.length > 0 && (
        <StepsList steps={steps} />
      )}
      
{proTips.length > 0 && (
        <ProTips tips={proTips} />
      )}
      
      
      <Footer />
    </motion.div>
  );
};

export default GuidePage;