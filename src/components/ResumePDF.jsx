"use client";
import { Document, Page, Text, StyleSheet, PDFDownloadLink, View } from "@react-pdf/renderer";
import { Button } from "@mui/material";

export default function ResumePDF({ resume }) {
  return (
    <PDFDownloadLink document={<ResumeDocument resume={resume} />} fileName="resume.pdf">
      {({ loading }) => (
        <Button variant="outlined" color="success" className="mt-4">
          {loading ? "Generating PDF..." : "Download Resume as PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

const ResumeDocument = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {resume.split('\n').map((text, index) => {
          if (text.startsWith('**') && text.endsWith('**')) {
            // Section headers
            return <Text key={index} style={styles.heading}>{text.replace(/\*\*/g, '')}</Text>;
          } else if (text.startsWith('* **')) {
            // Bullet points
            return <Text key={index} style={styles.bulletPoint}>{text.replace(/\* \*\*/g, '• ').replace(/\*\*/g, '')}</Text>;
          } else {
            // Regular text
            return <Text key={index} style={styles.text}>{text}</Text>;
          }
        })}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#2C3E50',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
    color: '#2C3E50',
  },
  bulletPoint: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 15,
    lineHeight: 1.5,
    color: '#2C3E50',
  }
});
