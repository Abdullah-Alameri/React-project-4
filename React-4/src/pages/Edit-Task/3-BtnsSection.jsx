import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/config';
import { doc } from 'firebase/firestore';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';

const BtnsSection = ({user, Id, deleteBTN}) => {
  const { t, i18n } = useTranslation();

  const [value, loading, error] = useDocument(doc(db, user.uid, Id));



  if (loading) {
    return (
      <main>
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </main>
    );
  }

  if (value) {
    return (
      <section className='center'>
      
    
      <div>
        <button onClick={async   (eo) => {
        deleteBTN()
        
  
        }} className='delete'>
          {i18n.language === "en" && "Delete task"}
          {i18n.language === "ar" && " حذف المهمة"}
          {i18n.language === "fr" && "Supprimer la tâche"}
          </button>
      </div>
    </section>
    );
  }

}

export default BtnsSection;
