import Flex from 'components/common/Flex';
import SoftBadge from 'components/common/SoftBadge';
import React from 'react';
import { Col, Form, FormCheck, Row } from 'react-bootstrap';

const PricingDefaultHeader = () => {
  return (
    <Col xs={12} className="mb-3">
      <Row className="align-items-center justify-content-center justify-content-sm-between">
        <Col sm="auto" className="text-center">
          <h5 className="d-inline-block">Billed Annually</h5>
          <SoftBadge bg="success" className="ms-2" pill>
            Save 25%
          </SoftBadge>
        </Col>
        <Col
          sm="auto"
          as={Flex}
          alignItems="center"
          className="mt-1 mt-sm-0 justify-content-center"
        >
          <FormCheck.Label htmlFor="custom-switch" className="me-3 mb-0">
            Monthly
          </FormCheck.Label>
          <Form.Check type="switch" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              className="pe-0 falcon-form-check-input"
              defaultChecked
            />
          </Form.Check>
          <Form.Check.Label className="ms-2 mb-0">Yearly</Form.Check.Label>
        </Col>
      </Row>
    </Col>
  );
};

export default PricingDefaultHeader;
