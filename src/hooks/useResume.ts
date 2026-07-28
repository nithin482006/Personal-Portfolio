import { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function useResume() {
  const [generating, setGenerating] = useState(false);

  const generatePDF = useCallback(async (element: HTMLElement): Promise<Blob | null> => {
    setGenerating(true);
    try {
      // High-quality capture for PDF
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const blob = pdf.output('blob');
      return blob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    } finally {
      setGenerating(false);
    }
  }, []);

  const downloadResume = useCallback(async (element: HTMLElement, filename = 'Nithin_Reddy_M_Resume.pdf') => {
    const blob = await generatePDF(element);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, [generatePDF]);

  const viewResume = useCallback(async (element: HTMLElement) => {
    const blob = await generatePDF(element);
    if (blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }, [generatePDF]);

  return { generating, downloadResume, viewResume, generatePDF };
}
