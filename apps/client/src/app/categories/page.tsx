'use client';
import {GenericCategoryPage} from '@clear-budget/shared/ui';

const ClientCategoryPage = () => (
  <GenericCategoryPage
    endpoint="http://localhost:5000/api/categories"
    title="User Categories"
  />
);

export default ClientCategoryPage;
