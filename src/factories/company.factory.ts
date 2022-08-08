import { define } from 'typeorm-seeding';
import { CompanyModel } from 'src/company-management/entities';

define(CompanyModel, () => {
  const company = new CompanyModel();
  company.name = 'BP';
  (company.fullname = 'BEAUTIPACK CO.,LTD.'),
    (company.address =
      '94 หมู่ที่ 11 ถนน สุขสวัสดิ์ ตำบล ในคลองบางปลากด อำเภอพระสมุทรเจดีย์ สมุทรปราการ 10290'),
    (company.telephone_no = '02 425 0364');
  return company;
});
