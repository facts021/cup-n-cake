import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';

export interface EnquiryRecord {
  id?: string;
  name: string;
  phone: string;
  occasion?: string;
  requirement: string;
  preferredDate?: string;
  message?: string;
  source: 'contact_form' | 'custom_cake_planner' | 'quick_enquiry';
  status: 'pending' | 'contacted' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface CustomCakeRecord {
  id?: string;
  occasion: string;
  size: string;
  flavor: string;
  deliveryDate?: string;
  customTheme?: string;
  customerName?: string;
  customerPhone?: string;
  status: 'new' | 'quote_sent' | 'in_baking' | 'completed';
  createdAt: string;
}

/**
 * Saves a customer enquiry into Firestore
 */
export async function saveEnquiryToFirestore(data: Omit<EnquiryRecord, 'id' | 'createdAt' | 'status'> & { id?: string }): Promise<string> {
  const docId = data.id || `enq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const collectionPath = 'enquiries';
  
  const record: EnquiryRecord = {
    id: docId,
    name: data.name.trim().substring(0, 100),
    phone: data.phone.trim().substring(0, 25),
    requirement: data.requirement.trim().substring(0, 1000),
    createdAt: new Date().toISOString(),
    status: 'pending',
    source: data.source,
  };

  if (data.occasion) record.occasion = data.occasion.trim().substring(0, 100);
  if (data.preferredDate) record.preferredDate = data.preferredDate.trim().substring(0, 50);
  if (data.message) record.message = data.message.trim().substring(0, 2000);

  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, record);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${docId}`);
  }
}

/**
 * Saves a custom cake planner request into Firestore
 */
export async function saveCustomCakeRequestToFirestore(data: {
  occasion: string;
  size: string;
  flavor: string;
  deliveryDate?: string;
  customTheme?: string;
  customerName?: string;
  customerPhone?: string;
}): Promise<string> {
  const docId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const collectionPath = 'custom_cake_requests';

  const record: CustomCakeRecord = {
    id: docId,
    occasion: data.occasion.trim().substring(0, 100),
    size: data.size.trim().substring(0, 100),
    flavor: data.flavor.trim().substring(0, 100),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  if (data.deliveryDate) record.deliveryDate = data.deliveryDate.trim().substring(0, 50);
  if (data.customTheme) record.customTheme = data.customTheme.trim().substring(0, 1000);
  if (data.customerName) record.customerName = data.customerName.trim().substring(0, 100);
  if (data.customerPhone) record.customerPhone = data.customerPhone.trim().substring(0, 25);

  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, record);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${docId}`);
  }
}

/**
 * Fetch enquiries (for authenticated bakery owner/admin)
 */
export async function fetchEnquiries(): Promise<EnquiryRecord[]> {
  const collectionPath = 'enquiries';
  try {
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EnquiryRecord));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}
