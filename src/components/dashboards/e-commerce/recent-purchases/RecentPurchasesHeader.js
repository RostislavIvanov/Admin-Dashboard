import IconButton from 'components/common/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

const RecentPurchasesHeader = ({ selectedRowIds }) => {
  return (
    <Row className="flex-between-center flex-column flex-sm-row">
      <Col sm="auto" className="d-flex align-items-center pe-0">
        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Recent Purchases</h5>
      </Col>
      <Col sm="auto" className="">
        {Object.keys(selectedRowIds).length > 0 ? (
          <div className="d-flex">
            <Form.Select size="sm" aria-label="Bulk actions">
              <option>Bulk Actions</option>
              <option value="refund">Refund</option>
              <option value="delete">Delete</option>
              <option value="archive">Archive</option>
            </Form.Select>
            <Button
              type="button"
              variant="falcon-default"
              size="sm"
              className="ms-2"
            >
              Apply
            </Button>
          </div>
        ) : (
          <div id="orders-actions">
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="plus"
              transform="shrink-3"
            >
              <span className="ms-1">New</span>
            </IconButton>
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="filter"
              transform="shrink-3"
              className="mx-2"
            >
              <span className="ms-1">Filter</span>
            </IconButton>
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="external-link-alt"
              transform="shrink-3"
            >
              <span className="ms-1">Export</span>
            </IconButton>
          </div>
        )}
      </Col>
    </Row>
  );
};

RecentPurchasesHeader.propTypes = {
  selectedRowIds: PropTypes.object
};

export default RecentPurchasesHeader;
